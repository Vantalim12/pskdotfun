import React from 'react';
import { NavLink } from 'react-router-dom';
import pskLogo from '@/assets/psk-logo.jpg';
import pumpfunLogo from '@/assets/pumpfun-logo.png';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-green-500/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-12 w-12 relative">
                <img 
                  src={pskLogo}
                  alt="PSK Services Logo" 
                  className="h-full w-full object-contain rounded-lg" 
                />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
                PSK Services
              </h2>
            </div>
            <p className="text-gray-300 max-w-md">
              Private Settlement Kernel - Zero-knowledge OTC trading platform for institutional DeFi. Execute large trades without market impact.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/PSKServices_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://pump.fun"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <img src={pumpfunLogo} alt="Pump.fun" className="h-6 w-6" />
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
            <p className="text-gray-300">
              For inquiries about institutional trading, please contact us through the platform.
            </p>
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
