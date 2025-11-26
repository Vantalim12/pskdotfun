import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { TradingInterface } from '@/components/TradingInterface';
import { OrderBook } from '@/components/OrderBook';
import { Card } from '@/components/ui/card';
import { Activity, TrendingUp, Users, DollarSign } from 'lucide-react';

const Trading = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState({
    totalVolume: 0,
    activeOrders: 0,
    totalTrades: 0,
    avgPrice: 0
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setIsAuthenticated(true);
      loadStats();
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setIsAuthenticated(true);
        loadStats();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadStats = async () => {
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'pending');

    const { data: trades } = await supabase
      .from('trades')
      .select('*');

    if (orders && trades) {
      setStats({
        totalVolume: trades.reduce((sum, t) => sum + (Number(t.amount_in) * Number(t.price)), 0),
        activeOrders: orders.length,
        totalTrades: trades.length,
        avgPrice: trades.length > 0 
          ? trades.reduce((sum, t) => sum + Number(t.price), 0) / trades.length 
          : 0
      });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <Card className="p-6 bg-psyco-black-light border-gray-800">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="pt-20 px-6 md:px-12 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dark Pool Trading</h1>
          <p className="text-gray-400">
            Private, secure OTC trading with encrypted order matching
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={DollarSign}
            label="Total Volume"
            value={`$${stats.totalVolume.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
            color="bg-green-500/20 text-green-500"
          />
          <StatCard
            icon={Activity}
            label="Active Orders"
            value={stats.activeOrders}
            color="bg-blue-500/20 text-blue-500"
          />
          <StatCard
            icon={TrendingUp}
            label="Total Trades"
            value={stats.totalTrades}
            color="bg-purple-500/20 text-purple-500"
          />
          <StatCard
            icon={Users}
            label="Avg Price"
            value={`$${stats.avgPrice.toFixed(2)}`}
            color="bg-orange-500/20 text-orange-500"
          />
        </div>

        {/* Trading Interface and Order Book */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TradingInterface />
          <OrderBook />
        </div>
      </div>
    </div>
  );
};

export default Trading;
