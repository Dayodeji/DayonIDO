"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useWallet } from "@/hooks/use-wallet"
import { Coins, TrendingUp, Clock, Users } from "lucide-react"

interface IDOInterfaceProps {
  contractAddress?: string
  tokenName?: string
  tokenSymbol?: string
  tokenPrice?: string
  totalSupply?: string
  onBuy?: (amount: string) => Promise<void>
}

export function IDOInterface({
  contractAddress = "0xBc8CbB7739B1e053B2Db35C449ca1BAF82c971a8", // Deployed IDO Contract on Sepolia
  tokenName = "DrDayo Token",
  tokenSymbol = "DRDAYO",
  tokenPrice = "0.01", // Updated to match deployed contract price
  totalSupply = "1,000,000",
  onBuy,
}: IDOInterfaceProps) {
  const [buyAmount, setBuyAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { isConnected } = useWallet()

  const calculateTokens = (ethAmount: string) => {
    if (!ethAmount || isNaN(Number(ethAmount))) return "0"
    return (Number(ethAmount) / Number(tokenPrice)).toLocaleString()
  }

  const handleBuy = async () => {
    if (!buyAmount || !onBuy) return

    setIsLoading(true)
    try {
      await onBuy(buyAmount)
    } catch (error) {
      console.error("Buy failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* IDO Header */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Coins className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-bold">{tokenName} IDO</CardTitle>
          </div>
          <p className="text-muted-foreground">Participate in the Initial DEX Offering for {tokenSymbol} tokens</p>
        </CardHeader>
      </Card>

      {/* IDO Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-sm text-muted-foreground">Token Price</div>
            <div className="font-semibold">{tokenPrice} ETH</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Coins className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-sm text-muted-foreground">Total Supply</div>
            <div className="font-semibold">{totalSupply}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-sm text-muted-foreground">Status</div>
            <Badge className="bg-green-100 text-green-800">Live</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-sm text-muted-foreground">Participants</div>
            <div className="font-semibold">247</div>
          </CardContent>
        </Card>
      </div>

      {/* Contract Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contract Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Contract Address</Label>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-sm bg-muted px-3 py-2 rounded-md flex-1 font-mono">{contractAddress}</code>
                <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(contractAddress)}>
                  Copy
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buy Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Purchase Tokens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Please connect your wallet to participate in the IDO</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="buy-amount">Amount (ETH)</Label>
                <Input
                  id="buy-amount"
                  type="number"
                  placeholder="0.0"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  step="0.001"
                  min="0"
                />
              </div>

              {buyAmount && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">You will receive:</span>
                    <span className="font-semibold">
                      {calculateTokens(buyAmount)} {tokenSymbol}
                    </span>
                  </div>
                </div>
              )}

              <Separator />

              <Button
                onClick={handleBuy}
                disabled={!buyAmount || isLoading || Number(buyAmount) <= 0}
                className="w-full"
                size="lg"
              >
                {isLoading ? "Processing..." : `Buy ${tokenSymbol} Tokens`}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Make sure you have enough ETH in your wallet for the purchase and gas fees
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
