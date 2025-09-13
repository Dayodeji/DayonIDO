"use client"

import { useState } from "react"
import { WalletConnect } from "@/components/wallet-connect"
import { IDOInterface } from "@/components/ido-interface"
import { TransactionStatus } from "@/components/transaction-status"
import { ErrorBoundary } from "@/components/error-boundary"
import { Navigation } from "@/components/navigation"
import { useWallet } from "@/hooks/use-wallet"
import { useContract } from "@/hooks/use-contract"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

const CONTRACT_ADDRESS = "0xBc8CbB7739B1e053B2Db35C449ca1BAF82c971a8" // Deployed IDO Contract on Sepolia

interface Transaction {
  hash: string
  status: "pending" | "success" | "failed"
  amount: string
  timestamp: number
}

export default function IDOPage() {
  const { isConnected } = useWallet()
  const { buyTokens, waitForTransaction } = useContract(CONTRACT_ADDRESS)
  const { toast } = useToast()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const addTransaction = (hash: string, amount: string) => {
    const newTx: Transaction = {
      hash,
      status: "pending",
      amount,
      timestamp: Date.now(),
    }
    setTransactions((prev) => [newTx, ...prev])
    return newTx
  }

  const updateTransactionStatus = (hash: string, status: "success" | "failed") => {
    setTransactions((prev) => prev.map((tx) => (tx.hash === hash ? { ...tx, status } : tx)))
  }

  const handleBuy = async (amount: string) => {
    try {
      // Show loading toast
      toast({
        title: "Transaction Pending",
        description: "Please confirm the transaction in MetaMask...",
      })

      // Execute the buy transaction
      const txHash = await buyTokens(amount)

      // Add transaction to history
      addTransaction(txHash, amount)

      // Show transaction submitted toast
      toast({
        title: "Transaction Submitted",
        description: `Transaction hash: ${txHash.slice(0, 10)}...`,
      })

      // Wait for transaction confirmation in background
      waitForTransaction(txHash)
        .then((receipt) => {
          updateTransactionStatus(txHash, "success")
          toast({
            title: "Purchase Successful!",
            description: `You have successfully purchased tokens. Transaction confirmed in block ${Number.parseInt(receipt.blockNumber, 16)}`,
          })
        })
        .catch((error) => {
          updateTransactionStatus(txHash, "failed")
          toast({
            title: "Transaction Failed",
            description: error.message || "Transaction confirmation failed",
            variant: "destructive",
          })
        })
    } catch (error: any) {
      // Show error toast
      toast({
        title: "Transaction Failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const clearTransactions = () => {
    setTransactions([])
  }

  return (
    <ErrorBoundary>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Dayon Token IDO
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Join the future of geospatial gaming. Participate in our Initial DEX Offering and become part of the Dayon
              ecosystem.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {!isConnected && (
              <div className="flex justify-center">
                <WalletConnect />
              </div>
            )}

            <IDOInterface contractAddress={CONTRACT_ADDRESS} onBuy={handleBuy} />

            {/* Transaction History */}
            <TransactionStatus transactions={transactions} onClearTransactions={clearTransactions} />
          </div>
        </div>

        <Toaster />
      </main>
    </ErrorBoundary>
  )
}
