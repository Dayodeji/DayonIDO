"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/hooks/use-wallet"
import { Wallet, ExternalLink, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function WalletConnect() {
  const { account, chainId, isConnected, isConnecting, connectWallet, disconnectWallet, getNetworkName, switchToSepolia, isSepoliaNetwork } = useWallet()
  const { toast } = useToast()

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account)
      toast({
        title: "Address copied!",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleSwitchNetwork = async () => {
    try {
      await switchToSepolia()
      toast({
        title: "Network Switched",
        description: "Successfully switched to Sepolia testnet",
      })
    } catch (error: any) {
      toast({
        title: "Network Switch Failed",
        description: error.message || "Failed to switch network",
        variant: "destructive",
      })
    }
  }

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <Wallet className="h-12 w-12 mx-auto text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-muted-foreground mb-4">Connect your MetaMask wallet to participate in the IDO</p>
          <Button onClick={connectWallet} disabled={isConnecting} className="w-full">
            {isConnecting ? "Connecting..." : "Connect MetaMask"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Wallet Connected</h3>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Connected
          </Badge>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Address</label>
            <div className="flex items-center gap-2 mt-1">
              <code className="text-sm bg-muted px-2 py-1 rounded flex-1">{formatAddress(account!)}</code>
              <Button size="sm" variant="outline" onClick={copyAddress}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Network</label>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={isSepoliaNetwork(chainId) ? "default" : "destructive"}>
                {getNetworkName(chainId)}
              </Badge>
              {!isSepoliaNetwork(chainId) && (
                <Button size="sm" variant="outline" onClick={handleSwitchNetwork}>
                  Switch to Sepolia
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={disconnectWallet}>
            Disconnect
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href={`https://sepolia.etherscan.io/address/${account}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              View on Explorer <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
