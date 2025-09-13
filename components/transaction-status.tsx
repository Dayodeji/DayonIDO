"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react"

interface Transaction {
  hash: string
  status: "pending" | "success" | "failed"
  amount: string
  timestamp: number
}

interface TransactionStatusProps {
  transactions: Transaction[]
  onClearTransactions: () => void
}

export function TransactionStatus({ transactions, onClearTransactions }: TransactionStatusProps) {
  if (transactions.length === 0) return null

  const getStatusIcon = (status: Transaction["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "success":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Success
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <Button variant="outline" size="sm" onClick={onClearTransactions}>
            Clear History
          </Button>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.hash} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(tx.status)}
                <div>
                  <div className="font-medium">Purchase {tx.amount} ETH</div>
                  <div className="text-sm text-muted-foreground">{new Date(tx.timestamp).toLocaleString()}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {getStatusBadge(tx.status)}
                <Button variant="ghost" size="sm" asChild>
                  <a href={`https://sepolia.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
