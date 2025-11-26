import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from './ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Order {
  id: string;
  order_type: 'buy' | 'sell';
  price: number;
  amount_in: number;
  token_in: string;
  token_out: string;
  status: string;
  created_at: string;
}

export const OrderBook: React.FC = () => {
  const [buyOrders, setBuyOrders] = useState<Order[]>([]);
  const [sellOrders, setSellOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('orders_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        () => {
          loadOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadOrders = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Load buy orders
    const { data: buys } = await supabase
      .from('orders')
      .select('*')
      .eq('order_type', 'buy')
      .eq('status', 'pending')
      .order('price', { ascending: false })
      .limit(10);

    // Load sell orders
    const { data: sells } = await supabase
      .from('orders')
      .select('*')
      .eq('order_type', 'sell')
      .eq('status', 'pending')
      .order('price', { ascending: true })
      .limit(10);

    if (buys) setBuyOrders(buys as Order[]);
    if (sells) setSellOrders(sells as Order[]);
  };

  const OrderRow: React.FC<{ order: Order; isBuy: boolean }> = ({ order, isBuy }) => (
    <div className={`flex justify-between py-2 px-3 rounded ${
      isBuy ? 'hover:bg-green-500/5' : 'hover:bg-red-500/5'
    } transition-colors`}>
      <span className={`font-mono ${isBuy ? 'text-green-500' : 'text-red-500'}`}>
        ${order.price.toFixed(4)}
      </span>
      <span className="text-gray-400 font-mono">
        {order.amount_in.toFixed(2)}
      </span>
      <span className="text-gray-500 font-mono">
        {(order.price * order.amount_in).toFixed(2)}
      </span>
    </div>
  );

  return (
    <Card className="p-6 bg-psyco-black-light border-gray-800">
      <h3 className="text-xl font-bold text-white mb-4">Order Book</h3>
      
      <div className="space-y-4">
        {/* Sell Orders (Asks) */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-4 w-4 text-red-500" />
            <span className="text-sm text-gray-400 font-medium">Sell Orders</span>
          </div>
          <div className="flex justify-between px-3 mb-2 text-xs text-gray-500">
            <span>Price (USD)</span>
            <span>Amount</span>
            <span>Total</span>
          </div>
          <div className="space-y-1">
            {sellOrders.length > 0 ? (
              sellOrders.map(order => (
                <OrderRow key={order.id} order={order} isBuy={false} />
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No sell orders</p>
            )}
          </div>
        </div>

        {/* Spread Indicator */}
        <div className="border-t border-b border-gray-700 py-2 text-center">
          <span className="text-psyco-green-DEFAULT font-mono text-sm">
            Spread: {sellOrders[0] && buyOrders[0] 
              ? `$${(sellOrders[0].price - buyOrders[0].price).toFixed(4)}` 
              : 'N/A'}
          </span>
        </div>

        {/* Buy Orders (Bids) */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-400 font-medium">Buy Orders</span>
          </div>
          <div className="flex justify-between px-3 mb-2 text-xs text-gray-500">
            <span>Price (USD)</span>
            <span>Amount</span>
            <span>Total</span>
          </div>
          <div className="space-y-1">
            {buyOrders.length > 0 ? (
              buyOrders.map(order => (
                <OrderRow key={order.id} order={order} isBuy={true} />
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No buy orders</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
