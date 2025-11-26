import React, { useEffect } from "react";
import { Shield, Eye, Clock, Lock, FileCheck, TrendingUp, Zap, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Features = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coreFeatures = [
    {
      id: "phantom-orderbook",
      icon: <Database size={32} />,
      title: "Phantom Order Book",
      subtitle: "Off-Chain Matching",
      description: "An encrypted order book invisible on-chain. Orders are sent to Keeper nodes that match buy/sell orders off-chain, only submitting final settlement transactions to Solana.",
      benefits: [
        "Prevents MEV bot front-running",
        "No visible order depth until execution",
        "Institutional-grade privacy",
        "Real-time encrypted matching"
      ],
      color: "text-purple-500"
    },
    {
      id: "atomic-swaps",
      icon: <Zap size={32} />,
      title: "Atomic Fill-or-Kill Swaps",
      subtitle: "Binary Execution",
      description: "Trades execute fully at agreed price or not at all. No partial fills that cause immediate price spikes and market impact.",
      benefits: [
        "100% fill or complete cancellation",
        "Zero slippage risk",
        "Predictable execution",
        "No sandwich attacks"
      ],
      color: "text-yellow-500"
    },
    {
      id: "twap",
      icon: <Clock size={32} />,
      title: "TWAP Execution",
      subtitle: "Time-Weighted Average Price",
      description: "Break large orders into hundreds of tiny, randomized shielded transactions over time to hide buying/selling pressure.",
      benefits: [
        "Disguise whale movements",
        "Minimize market impact",
        "Randomized timing & sizing",
        "Smart execution algorithms"
      ],
      color: "text-blue-500"
    }
  ];

  const privacyFeatures = [
    {
      icon: <Eye size={32} />,
      title: "Stealth Addresses",
      subtitle: "One-Time Addresses",
      description: "Automatically generate fresh, temporary wallet addresses for each trade, preventing transaction history tracking.",
      color: "text-green-500"
    },
    {
      icon: <Shield size={32} />,
      title: "Zero-Knowledge Proofs",
      subtitle: "Proof of Funds",
      description: "Prove you have $10M USDC without depositing first. Trade only when matched, minimizing smart contract risk.",
      color: "text-indigo-500"
    },
    {
      icon: <Lock size={32} />,
      title: "Confidential Transfers",
      subtitle: "SPL Token-2022",
      description: "Encrypt transaction amounts. Public ledger sees trade happened, but amount shows as '???' instead of exact numbers.",
      color: "text-pink-500"
    }
  ];

  const complianceFeatures = [
    {
      icon: <FileCheck size={32} />,
      title: "View Key Access",
      subtitle: "Auditor Compliance",
      description: "Special cryptographic keys decode only your transaction history for IRS or auditors while keeping public data hidden.",
      color: "text-orange-500"
    },
    {
      icon: <Shield size={32} />,
      title: "ZK-KYC Integration",
      subtitle: "Proof of Innocence",
      description: "Prove you're not on sanctions lists using ZK credentials without revealing identity. Clean institutional money only.",
      color: "text-red-500"
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Counterparty Scoring",
      subtitle: "Anonymous Trust",
      description: "Trust scores for anonymous traders based on successful trade history, without revealing who they are.",
      color: "text-cyan-500"
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Platform Features</h1>
            <p className="text-xl text-gray-300 mb-8">
              Enterprise-grade privacy and execution technology for institutional DeFi trading. The complete PSK architecture explained.
            </p>
            <Link to="/trading">
              <Button className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark">
                Start Trading
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Trading Features */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">The Kernel</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Core trading features that define how trades are matched and executed without leaking data
            </p>
          </div>
          
          {coreFeatures.map((feature, index) => (
            <div 
              key={feature.id}
              id={feature.id}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 mb-20 last:mb-0`}
            >
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className={`${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">{feature.subtitle}</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-6">{feature.description}</p>
                
                <div className="bg-psyco-black-light rounded-xl p-6">
                  <h4 className="text-lg font-medium text-white mb-4">Key Benefits:</h4>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="text-psyco-green-DEFAULT mt-1 mr-3">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6.66675 10.1148L12.7947 3.98608L13.7381 4.92875L6.66675 12.0001L2.42675 7.76008L3.36941 6.81741L6.66675 10.1148Z" fill="currentColor" />
                          </svg>
                        </div>
                        <span className="text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2">
                <div className="glassmorphism p-8 rounded-2xl h-full flex items-center justify-center">
                  <div className={`${feature.color} opacity-20`}>
                    {React.cloneElement(feature.icon, { size: 200 })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Features */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">The Shield</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Zero-knowledge technology protecting user identity and trade details
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {privacyFeatures.map((feature, index) => (
              <div 
                key={index}
                className="glassmorphism p-6 card-hover"
              >
                <div className={`${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">{feature.subtitle}</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Features */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">Institutional Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Compliance and audit features for institutional traders and OTC desks
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {complianceFeatures.map((feature, index) => (
              <div 
                key={index}
                className="glassmorphism p-6 card-hover"
              >
                <div className={`${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">{feature.subtitle}</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="glassmorphism p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Trade Privately?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Join institutional traders and whales who value privacy and execution quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/trading">
                <Button className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark">
                  Start Trading
                </Button>
              </Link>
              <Link to="/documentation">
                <Button variant="outline" className="border-psyco-green-DEFAULT text-psyco-green-DEFAULT hover:bg-psyco-green-DEFAULT/10">
                  Read Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
