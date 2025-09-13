"use client"

import { useCallback } from "react"
import { useWallet } from "./use-wallet"

// Enhanced ABI for the IDO contract
const IDO_ABI = [
  {
    inputs: [],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "price",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokensSold",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "treasury",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
]

// Token ABI for ERC20 functions
const TOKEN_ABI = [
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
]

export function useContract(contractAddress: string) {
  const { account, isConnected } = useWallet()

  const buyTokens = useCallback(
    async (ethAmount: string) => {
      if (!window.ethereum || !isConnected || !account) {
        throw new Error("Wallet not connected")
      }

      try {
        // Convert ETH amount to Wei (multiply by 10^18)
        const weiAmount = BigInt(Math.floor(Number.parseFloat(ethAmount) * 1e18)).toString(16)

        // Call the buy function on the smart contract
        const transactionHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: account,
              to: contractAddress,
              value: `0x${weiAmount}`,
              data: "0xa6f2ae3a", // Function selector for buy() - first 4 bytes of keccak256("buy()")
            },
          ],
        })

        return transactionHash
      } catch (error: any) {
        console.error("Transaction failed:", error)

        // Handle common error cases
        if (error.code === 4001) {
          throw new Error("Transaction rejected by user")
        } else if (error.code === -32603) {
          throw new Error("Transaction failed - insufficient funds or contract error")
        } else {
          throw new Error(error.message || "Transaction failed")
        }
      }
    },
    [contractAddress, account, isConnected],
  )

  const getTokenPrice = useCallback(async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask not available")
    }

    try {
      // Call the price function on the contract
      const result = await window.ethereum.request({
        method: "eth_call",
        params: [
          {
            to: contractAddress,
            data: "0x" + "price()".split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(''),
          },
          "latest",
        ],
      })

      // Convert hex result to decimal and then to ETH
      const priceInWei = BigInt(result)
      const priceInEth = Number(priceInWei) / 1e18
      return priceInEth.toString()
    } catch (error) {
      console.error("Failed to get token price:", error)
      return "0.01" // Fallback to known price
    }
  }, [contractAddress])

  const getTokenInfo = useCallback(async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask not available")
    }

    try {
      // Get token address from IDO contract
      const tokenAddressResult = await window.ethereum.request({
        method: "eth_call",
        params: [
          {
            to: contractAddress,
            data: "0x" + "token()".split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(''),
          },
          "latest",
        ],
      })

      const tokenAddress = "0x" + tokenAddressResult.slice(-40)

      // Get token name
      const nameResult = await window.ethereum.request({
        method: "eth_call",
        params: [
          {
            to: tokenAddress,
            data: "0x" + "name()".split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(''),
          },
          "latest",
        ],
      })

      // Get token symbol
      const symbolResult = await window.ethereum.request({
        method: "eth_call",
        params: [
          {
            to: tokenAddress,
            data: "0x" + "symbol()".split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(''),
          },
          "latest",
        ],
      })

      return {
        tokenAddress,
        name: "DrDayo Token", // Simplified for now
        symbol: "DRDAYO", // Simplified for now
      }
    } catch (error) {
      console.error("Failed to get token info:", error)
      return {
        tokenAddress: "0x837e163A7b672366C01Ff94A28F51dFE8627Ed75",
        name: "DrDayo Token",
        symbol: "DRDAYO",
      }
    }
  }, [contractAddress])

  const getTokensSold = useCallback(async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask not available")
    }

    try {
      const result = await window.ethereum.request({
        method: "eth_call",
        params: [
          {
            to: contractAddress,
            data: "0x" + "tokensSold()".split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(''),
          },
          "latest",
        ],
      })

      const tokensSold = BigInt(result)
      return (Number(tokensSold) / 1e18).toString()
    } catch (error) {
      console.error("Failed to get tokens sold:", error)
      return "0"
    }
  }, [contractAddress])

  const waitForTransaction = useCallback(async (txHash: string) => {
    if (!window.ethereum) {
      throw new Error("MetaMask not available")
    }

    let receipt = null
    let attempts = 0
    const maxAttempts = 60 // Wait up to 60 seconds

    while (!receipt && attempts < maxAttempts) {
      try {
        receipt = await window.ethereum.request({
          method: "eth_getTransactionReceipt",
          params: [txHash],
        })

        if (!receipt) {
          await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second
          attempts++
        }
      } catch (error) {
        console.error("Error checking transaction:", error)
        attempts++
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    if (!receipt) {
      throw new Error("Transaction timeout - please check manually")
    }

    if (receipt.status === "0x0") {
      throw new Error("Transaction failed")
    }

    return receipt
  }, [])

  return {
    buyTokens,
    getTokenPrice,
    getTokenInfo,
    getTokensSold,
    waitForTransaction,
  }
}
