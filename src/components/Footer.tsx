
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-green-500/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 relative">
                <img 
                  src="/lovable-uploads/8acfad30-aa90-4edd-b779-aafd43058584.png" 
                  alt="PSK Services Logo" 
                  className="h-full w-full object-contain" 
                />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
                PSK Services
              </h2>
            </div>
            <p className="text-gray-300 max-w-md">
              Private Settlement Kernel - Zero-knowledge OTC trading platform for institutional DeFi. Execute large trades without market impact.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://twitter.com/psk_services" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://discord.gg/psk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://github.com/psk-services" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4 pb-2 border-b border-green-500/10">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to="/" 
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/trading" 
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Trading
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/features" 
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/documentation" 
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Documentation
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/compliance" 
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Compliance
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-4 pb-2 border-b border-green-500/10">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-300">
                <Mail size={16} className="text-green-500" />
                <span>psk-services@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <Facebook size={16} className="text-green-500" />
                <a 
                  href="https://discord.gg/psk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  Discord Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-500/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} PSK Services. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
