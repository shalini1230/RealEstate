import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, DollarSign } from 'lucide-react';
import { Property } from '../lib/supabase';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const primaryImage = property.images && property.images.length > 0
    ? property.images[0]
    : 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-56 overflow-hidden">
        <img
          src={primaryImage}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.status}
          </span>
          {property.featured && (
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {property.property_type}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{property.title}</h3>
          <div className="flex items-center text-blue-600 font-bold text-xl">
            <DollarSign className="h-5 w-5" />
            <span>{formatPrice(property.price)}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm line-clamp-1">{property.city}, {property.state}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Bed className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Beds</p>
              <p className="font-semibold text-gray-900">{property.bedrooms}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Bath className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Baths</p>
              <p className="font-semibold text-gray-900">{property.bathrooms}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Maximize className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Sq Ft</p>
              <p className="font-semibold text-gray-900">{property.size.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Dealer</p>
            <p className="font-semibold text-gray-900">{property.dealer_name}</p>
          </div>
          <Link
            to={`/property/${property.id}`}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
