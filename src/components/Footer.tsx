
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-gray-800">KADAI</span>
            </div>
            <p className="text-gray-600 text-sm max-w-xs">
              Connecting customers with local vendors for convenient deliveries
              and scheduled visits.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
                For Customers
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/how-it-works"
                    className="text-gray-600 hover:text-primary text-sm"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/find-vendors"
                    className="text-gray-600 hover:text-primary text-sm"
                  >
                    Find Vendors
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
                For Vendors
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/join-as-vendor"
                    className="text-gray-600 hover:text-primary text-sm"
                  >
                    Join As Vendor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/vendor-faq"
                    className="text-gray-600 hover:text-primary text-sm"
                  >
                    Vendor FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-gray-600 hover:text-primary text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-600 hover:text-primary text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} KADAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
