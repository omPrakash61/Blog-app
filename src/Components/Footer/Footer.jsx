import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-4">
              <Logo width="120px" />
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Dev-OPS. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Account
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm text-gray-400">
          Made with ❤️ by Dev-OPS
        </div>
      </div>
    </footer>
  );
}

export default Footer;
