import React, { useEffect, useState } from "react";
import { Shield, FileCheck, Eye, Lock, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Compliance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [kycLevel, setKycLevel] = useState('none');

  useEffect(() => {
    window.scrollTo(0, 0);
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsAuthenticated(true);
      loadProfile(session.user.id);
    }
  };

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setProfile(data);
      setKycLevel(data.kyc_level || 'none');
    }
  };

  const handleKYCUpgrade = async (level: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to upgrade your KYC level",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        kyc_level: level,
        kyc_verified: true
      })
      .eq('id', profile.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update KYC level",
        variant: "destructive"
      });
    } else {
      toast({
        title: "KYC Updated",
        description: `Your KYC level has been upgraded to ${level}`,
      });
      loadProfile(profile.id);
    }
  };

  const complianceFeatures = [
    {
      icon: <FileCheck size={32} />,
      title: "View Key Access",
      description: "Provide auditors with cryptographic keys to decode your transaction history while keeping data private from the public.",
      level: "All Users",
      color: "text-orange-500"
    },
    {
      icon: <Shield size={32} />,
      title: "ZK-KYC Verification",
      description: "Prove you're not on sanctions lists using zero-knowledge credentials without revealing your identity.",
      level: "KYC Level 1+",
      color: "text-blue-500"
    },
    {
      icon: <Eye size={32} />,
      title: "Transaction Monitoring",
      description: "Optional transaction monitoring for institutional compliance requirements and AML screening.",
      level: "KYC Level 2+",
      color: "text-purple-500"
    },
    {
      icon: <Lock size={32} />,
      title: "Institutional Grade",
      description: "White-glove service with dedicated compliance officer and custom reporting for large institutional traders.",
      level: "KYC Level 3",
      color: "text-green-500"
    }
  ];

  const kycLevels = [
    {
      level: "Level 0",
      name: "Basic",
      limit: "$10,000",
      requirements: ["Email verification", "Wallet connection"],
      color: "gray"
    },
    {
      level: "Level 1",
      name: "Verified",
      limit: "$100,000",
      requirements: ["Level 0 complete", "ID verification", "Address proof"],
      color: "blue"
    },
    {
      level: "Level 2",
      name: "Advanced",
      limit: "$1,000,000",
      requirements: ["Level 1 complete", "Enhanced due diligence", "Source of funds"],
      color: "purple"
    },
    {
      level: "Level 3",
      name: "Institutional",
      limit: "Unlimited",
      requirements: ["Level 2 complete", "Entity verification", "Compliance officer"],
      color: "green"
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Compliance & KYC</h1>
            <p className="text-xl text-gray-300 mb-8">
              Maintain privacy while meeting regulatory requirements. PSK Services provides institutional-grade compliance tools.
            </p>
            {!isAuthenticated && (
              <Link to="/auth">
                <Button className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark">
                  Login to Verify
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Current Status (if authenticated) */}
      {isAuthenticated && profile && (
        <section className="py-12 px-6 md:px-12 bg-psyco-black">
          <div className="max-w-7xl mx-auto">
            <Card className="p-6 bg-psyco-black-light border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Your KYC Status</h3>
                  <p className="text-gray-400">Current verification level: <span className="text-psyco-green-DEFAULT font-medium">{kycLevel}</span></p>
                  <p className="text-gray-400">Trust Score: <span className="text-psyco-green-DEFAULT font-medium">{profile.trust_score}</span></p>
                </div>
                <CheckCircle className={`h-12 w-12 ${profile.kyc_verified ? 'text-green-500' : 'text-gray-500'}`} />
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Compliance Features */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">Compliance Tools</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Privacy-preserving compliance for institutional traders
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {complianceFeatures.map((feature, index) => (
              <Card key={index} className="p-6 bg-psyco-black-light border-gray-800 card-hover">
                <div className={`${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">{feature.level}</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* KYC Levels */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">KYC Levels</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the verification level that matches your trading volume
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kycLevels.map((level, index) => (
              <Card key={index} className={`p-6 bg-psyco-black border-gray-800 ${
                kycLevel === level.level ? 'ring-2 ring-psyco-green-DEFAULT' : ''
              }`}>
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-white mb-1">{level.level}</h3>
                  <p className="text-sm text-gray-400">{level.name}</p>
                </div>
                <div className="text-center mb-6">
                  <p className="text-2xl font-bold text-psyco-green-DEFAULT">{level.limit}</p>
                  <p className="text-xs text-gray-500">Daily limit</p>
                </div>
                <div className="space-y-2 mb-6">
                  {level.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start text-sm text-gray-400">
                      <CheckCircle className="h-4 w-4 text-psyco-green-DEFAULT mr-2 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
                {isAuthenticated && kycLevel !== level.level && (
                  <Button
                    onClick={() => handleKYCUpgrade(level.level)}
                    className="w-full bg-psyco-green-DEFAULT hover:bg-psyco-green-dark"
                    size="sm"
                  >
                    Upgrade
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Questions About Compliance?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our compliance team is available to help institutional traders meet regulatory requirements while maintaining privacy.
          </p>
          <div className="flex gap-4 justify-center">
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
      </section>
    </div>
  );
};

export default Compliance;
