import React, { useEffect } from "react";
import { Book, Code, Shield, Zap, Database, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Documentation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: <Book size={24} />,
      title: "Getting Started",
      description: "Quick start guide for traders",
      topics: [
        "Creating your account",
        "Connecting Solana wallet",
        "Understanding the interface",
        "Your first trade"
      ]
    },
    {
      icon: <Database size={24} />,
      title: "Order Book Mechanics",
      description: "How the dark pool works",
      topics: [
        "Phantom order matching",
        "Off-chain keeper nodes",
        "Liquidity aggregation",
        "Settlement process"
      ]
    },
    {
      icon: <Zap size={24} />,
      title: "Execution Types",
      description: "Atomic vs TWAP execution",
      topics: [
        "Fill-or-kill atomic swaps",
        "TWAP configuration",
        "Execution strategies",
        "Gas optimization"
      ]
    },
    {
      icon: <Shield size={24} />,
      title: "Privacy Features",
      description: "Zero-knowledge technology",
      topics: [
        "Stealth address generation",
        "ZK proof of funds",
        "Confidential transfers",
        "Transaction encryption"
      ]
    },
    {
      icon: <Lock size={24} />,
      title: "Security",
      description: "Protecting your assets",
      topics: [
        "Wallet security best practices",
        "Smart contract audits",
        "View key management",
        "Counterparty verification"
      ]
    },
    {
      icon: <Code size={24} />,
      title: "API Reference",
      description: "For institutional integrations",
      topics: [
        "REST API endpoints",
        "WebSocket feeds",
        "Order submission",
        "Rate limits"
      ]
    }
  ];

  const techStack = [
    {
      name: "Blockchain",
      tech: "Solana",
      description: "High-speed, low-cost L1 blockchain"
    },
    {
      name: "Token Standard",
      tech: "SPL Token-2022",
      description: "With ConfidentialTransfer extension"
    },
    {
      name: "ZK Privacy",
      tech: "Elusiv SDK / Light Protocol",
      description: "Shielded pool and state compression"
    },
    {
      name: "Frontend",
      tech: "React + TypeScript",
      description: "Real-time WebSocket updates"
    },
    {
      name: "Backend",
      tech: "Lovable Cloud",
      description: "PostgreSQL + Edge Functions"
    },
    {
      name: "Wallet",
      tech: "Solana Wallet Adapter",
      description: "Phantom, Solflare support"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-psyco-black-light py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Documentation</h1>
            <p className="text-xl text-gray-300 mb-8">
              Complete technical documentation for traders and developers building on PSK Services.
            </p>
            <Link to="/trading">
              <Button className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark">
                Start Trading
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">Documentation Sections</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about using PSK Services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <Card key={index} className="p-6 bg-psyco-black-light border-gray-800 card-hover">
                <div className="text-psyco-green-DEFAULT mb-4">
                  {section.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{section.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{section.description}</p>
                <ul className="space-y-2">
                  {section.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-500">
                      <span className="text-psyco-green-DEFAULT mr-2">→</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">Technology Stack</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              PSK Services is built on cutting-edge blockchain and privacy technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((item, index) => (
              <Card key={index} className="p-6 bg-psyco-black border-gray-800">
                <div className="mb-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">{item.name}</span>
                </div>
                <h3 className="text-xl font-bold text-psyco-green-DEFAULT mb-2">{item.tech}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Example */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">Quick API Example</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Simple example of placing an order via the API
            </p>
          </div>
          
          <Card className="p-8 bg-psyco-black-light border-gray-800 max-w-3xl mx-auto">
            <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Place a dark pool order
const order = await supabase
  .from('orders')
  .insert({
    order_type: 'buy',
    token_in: 'USDC',
    token_out: 'SOL',
    amount_in: 10000,
    price: 100,
    execution_type: 'twap',
    twap_duration_minutes: 240
  });

// Subscribe to real-time order updates
supabase
  .channel('orders')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'orders'
  }, (payload) => {
    console.log('Order update:', payload);
  })
  .subscribe();`}
            </pre>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need More Help?</h2>
          <p className="text-gray-300 mb-8">
            Join our Discord community for developer support
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/trading">
              <Button className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark">
                Start Trading
              </Button>
            </Link>
            <Link to="/compliance">
              <Button variant="outline" className="border-psyco-green-DEFAULT text-psyco-green-DEFAULT hover:bg-psyco-green-DEFAULT/10">
                Compliance Info
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
