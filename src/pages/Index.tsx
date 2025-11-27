import React, { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import { Link } from "react-router-dom";
import { Volume2, Music2, Lightbulb, PartyPopper, MoveRight, CalendarDays } from "lucide-react";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredServices = [
    {
      title: "Dark Pool Order Book",
      description: "Encrypted order matching prevents front-running and market manipulation for institutional trades.",
      icon: <Volume2 size={24} />,
      imageSrc: "/lovable-uploads/708f9e32-840d-46a4-aaa4-75ad2689e16f.png",
      link: "/trading"
    },
    {
      title: "ZK Privacy Layer",
      description: "Zero-knowledge proofs and stealth addresses keep your trading activity completely private.",
      icon: <Lightbulb size={24} />,
      imageSrc: "/lovable-uploads/becfc2e3-b59f-4f86-afca-b9f6fc7b7c14.png",
      link: "/services"
    },
    {
      title: "TWAP Execution",
      description: "Time-weighted average price execution breaks large orders into randomized micro-trades.",
      icon: <Music2 size={24} />,
      imageSrc: "/lovable-uploads/03e83f18-76a1-4349-a197-dbde03a93343.png",
      link: "/services"
    }
  ];

  return (
    <div>
      <HeroSection />
      
      {/* Services Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Core Features</h2>
              <p className="text-gray-400 max-w-2xl">
                Enterprise-grade privacy and execution for institutional DeFi trading
              </p>
            </div>
            <Link 
              to="/services"
              className="mt-4 sm:mt-0 flex items-center text-psyco-green-DEFAULT hover:text-psyco-green-light transition-colors"
            >
              View all services
              <MoveRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Solana Live Chart Section */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-DEFAULT">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Solana Live Chart</h2>
            <p className="text-gray-400">Real-time SOL/USD price movement</p>
          </div>
          <div className="glassmorphism p-6 rounded-lg">
            <div className="w-full h-[500px] relative overflow-hidden rounded-lg">
              <iframe
                src="https://www.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=BINANCE%3ASOLUSDT&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&withdateranges=1&showpopupbutton=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&showpopupbutton=1&locale=en&utm_source=&utm_medium=widget&utm_campaign=chart&utm_term=BINANCE%3ASOLUSDT"
                className="w-full h-full border-0"
                title="Solana Price Chart"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* Event Types Section */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-2">Perfect for Any Trader</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                From DeFi whales to institutional OTC desks
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { name: "Whales", icon: <Volume2 size={32} /> },
                { name: "OTC Desks", icon: <PartyPopper size={32} /> },
                { name: "Institutions", icon: <CalendarDays size={32} /> },
                { name: "DAOs", icon: <Music2 size={32} /> }
              ].map((trader, index) => (
              <div 
                key={index}
                className="glassmorphism flex flex-col items-center justify-center py-8 px-4 text-center card-hover animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-psyco-green-DEFAULT mb-4">
                  {trader.icon}
                </div>
                <h3 className="text-lg font-medium text-white">{trader.name}</h3>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/trading"
              className="inline-flex items-center bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 btn-glow"
            >
              Start Trading
              <MoveRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Trade Privately?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Join the dark pool and execute large trades without market impact. Zero-knowledge privacy for institutional DeFi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/trading"
                className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center btn-glow"
              >
                Start Trading
                <MoveRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/features"
                className="bg-transparent border border-psyco-green-DEFAULT text-psyco-green-DEFAULT hover:bg-psyco-green-DEFAULT/10 font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                View Features
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
