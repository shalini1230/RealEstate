import { useEffect, useState } from 'react';
import { supabase, Property } from '../lib/supabase';
import { PropertyCard } from '../components/PropertyCard';
import { SearchBar } from '../components/SearchBar';

export const Listings = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
      } else {
        setProperties(data || []);
        setFilteredProperties(data || []);
      }
      setLoading(false);
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    let filtered = [...properties];

    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (minPrice) {
      filtered = filtered.filter((property) => property.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((property) => property.price <= parseFloat(maxPrice));
    }

    if (bedrooms) {
      filtered = filtered.filter((property) => property.bedrooms >= parseInt(bedrooms));
    }

    if (propertyType) {
      filtered = filtered.filter((property) => property.property_type === propertyType);
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'size-low':
        filtered.sort((a, b) => a.size - b.size);
        break;
      case 'size-high':
        filtered.sort((a, b) => b.size - a.size);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    setFilteredProperties(filtered);
  }, [searchTerm, minPrice, maxPrice, bedrooms, propertyType, sortBy, properties]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Property Listings</h1>
          <p className="text-xl text-gray-600">
            Showing {filteredProperties.length} of {properties.length} properties
          </p>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          bedrooms={bedrooms}
          setBedrooms={setBedrooms}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl mb-4">No properties found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setMinPrice('');
                setMaxPrice('');
                setBedrooms('');
                setPropertyType('');
                setSortBy('newest');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
