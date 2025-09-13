"use client"

import { useState, useEffect, useCallback } from "react"

declare global {
  interface Window {
    ethereum?: any
  }
}

interface WalletState {
  account: string | null
  chainId: string | null
  isConnected: boolean
  isConnecting: boolean
}

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    account: null,
    chainId: null,
    isConnected: false,
    isConnecting: false,
  })

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install MetaMask to continue.")
      return
    }

    setWalletState((prev) => ({ ...prev, isConnecting: true }))

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      })

      setWalletState({
        account: accounts[0],
        chainId,
        isConnected: true,
        isConnecting: false,
      })
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      setWalletState((prev) => ({ ...prev, isConnecting: false }))
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    setWalletState({
      account: null,
      chainId: null,
      isConnected: false,
      isConnecting: false,
    })
  }, [])

  const getNetworkName = useCallback((chainId: string | null) => {
    if (!chainId) return "Unknown"

    const networks: { [key: string]: string } = {
      "0x1": "Ethereum Mainnet",
      "0x89": "Polygon",
      "0x38": "BSC",
      "0xa4b1": "Arbitrum",
      "0xa": "Optimism",
      "0xaa36a7": "Sepolia Testnet",
    }

    return networks[chainId] || `Chain ID: ${chainId}`
  }, [])

  const switchToSepolia = useCallback(async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask not installed")
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }], // Sepolia chain ID
      })
    } catch (error: any) {
      // If the chain doesn't exist, add it
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xaa36a7",
                chainName: "Sepolia Test Network",
                nativeCurrency: {
                  name: "Sepolia Ether",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://eth-sepolia.g.alchemy.com/v2/FRC9i8y6nwyWBdY1i3ahDh68Eeoqh2tt"],
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              },
            ],
          })
        } catch (addError) {
          throw new Error("Failed to add Sepolia network")
        }
      } else {
        throw new Error("Failed to switch to Sepolia network")
      }
    }
  }, [])

  const isSepoliaNetwork = useCallback((chainId: string | null) => {
    return chainId === "0xaa36a7"
  }, [])

  useEffect(() => {
    if (!window.ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet()
      } else {
        setWalletState((prev) => ({
          ...prev,
          account: accounts[0],
          isConnected: true,
        }))
      }
    }

    const handleChainChanged = (chainId: string) => {
      setWalletState((prev) => ({ ...prev, chainId }))
    }

    window.ethereum.on("accountsChanged", handleAccountsChanged)
    window.ethereum.on("chainChanged", handleChainChanged)

    // Check if already connected
    window.ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
      if (accounts.length > 0) {
        window.ethereum.request({ method: "eth_chainId" }).then((chainId: string) => {
          setWalletState({
            account: accounts[0],
            chainId,
            isConnected: true,
            isConnecting: false,
          })
        })
      }
    })

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [disconnectWallet])

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    getNetworkName,
    switchToSepolia,
    isSepoliaNetwork,
  }
}
