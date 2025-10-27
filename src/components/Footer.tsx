import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">EstateHub</span>
            </div>
            <p className="text-sm">
              Your trusted partner in finding the perfect property. We connect buyers, sellers, and renters with their dream homes.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/listings" className="hover:text-blue-400 transition-colors">Listings</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Houses</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Apartments</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Condos</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Commercial</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Patancheru ,Sangareddy</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-500" />
                <span className="text-sm">+91 6300969083</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <span className="text-sm">23h51a05g1@cmrcet.ac.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} EstateHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
