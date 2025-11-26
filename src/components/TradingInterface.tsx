import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useToast } from './ui/use-toast';
import { Shield, Clock, Zap } from 'lucide-react';

export const TradingInterface: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const { toast } = useToast();
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [tokenIn, setTokenIn] = useState('SOL');
  const [tokenOut, setTokenOut] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [executionType, setExecutionType] = useState<'atomic' | 'twap'>('atomic');
  const [twapDuration, setTwapDuration] = useState('60');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected || !publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to place orders",
        variant: "destructive"
      });
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Not authenticated",
        description: "Please login to place orders",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    try {
      const amountNum = parseFloat(amount);
      const priceNum = parseFloat(price);
      
      if (isNaN(amountNum) || isNaN(priceNum) || amountNum <= 0 || priceNum <= 0) {
        throw new Error('Invalid amount or price');
      }

      const { error } = await supabase.from('orders').insert({
        user_id: user.id,
        order_type: orderType,
        token_in: orderType === 'buy' ? tokenOut : tokenIn,
        token_out: orderType === 'buy' ? tokenIn : tokenOut,
        amount_in: amountNum,
        amount_out: amountNum * priceNum,
        price: priceNum,
        execution_type: executionType,
        twap_duration_minutes: executionType === 'twap' ? parseInt(twapDuration) : null,
        stealth_address: publicKey.toString()
      });

      if (error) throw error;

      toast({
        title: "Order placed successfully!",
        description: `Your ${orderType} order for ${amount} ${tokenIn} has been submitted to the dark pool`,
      });

      // Reset form
      setAmount('');
      setPrice('');
    } catch (error: any) {
      toast({
        title: "Error placing order",
        description: error.message || "Failed to submit order",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="p-6 bg-psyco-black-light border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Place Order</h3>
        <WalletMultiButton className="!bg-psyco-green-DEFAULT hover:!bg-psyco-green-dark" />
      </div>

      {!connected ? (
        <div className="text-center py-12">
          <Shield className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">Connect your wallet to start trading</p>
          <WalletMultiButton className="!bg-psyco-green-DEFAULT hover:!bg-psyco-green-dark" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={orderType} onValueChange={(v) => setOrderType(v as 'buy' | 'sell')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buy" className="data-[state=active]:bg-green-500">
                Buy
              </TabsTrigger>
              <TabsTrigger value="sell" className="data-[state=active]:bg-red-500">
                Sell
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Token In</Label>
              <Select value={tokenIn} onValueChange={setTokenIn}>
                <SelectTrigger className="mt-2 bg-psyco-black border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOL">SOL</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="BONK">BONK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white">Token Out</Label>
              <Select value={tokenOut} onValueChange={setTokenOut}>
                <SelectTrigger className="mt-2 bg-psyco-black border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="SOL">SOL</SelectItem>
                  <SelectItem value="BONK">BONK</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-white">Amount</Label>
            <Input
              type="number"
              step="0.000001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="mt-2 bg-psyco-black border-gray-700 text-white"
              required
            />
          </div>

          <div>
            <Label className="text-white">Price (USD)</Label>
            <Input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="mt-2 bg-psyco-black border-gray-700 text-white"
              required
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Execution Type</Label>
            <Tabs value={executionType} onValueChange={(v) => setExecutionType(v as 'atomic' | 'twap')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="atomic" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Atomic
                </TabsTrigger>
                <TabsTrigger value="twap" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  TWAP
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {executionType === 'twap' && (
            <div>
              <Label className="text-white">TWAP Duration (minutes)</Label>
              <Input
                type="number"
                value={twapDuration}
                onChange={(e) => setTwapDuration(e.target.value)}
                placeholder="60"
                className="mt-2 bg-psyco-black border-gray-700 text-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                Order will be split into multiple trades over this duration
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : `Place ${orderType.toUpperCase()} Order`}
          </Button>

          <div className="bg-psyco-black p-4 rounded-lg">
            <p className="text-xs text-gray-500 flex items-start gap-2">
              <Shield className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>
                Your order will be encrypted and submitted to the dark pool. 
                Only counterparties will see aggregated liquidity, not individual order details.
              </span>
            </p>
          </div>
        </form>
      )}
    </Card>
  );
};
