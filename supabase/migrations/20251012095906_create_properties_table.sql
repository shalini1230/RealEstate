/*
  # Create Properties Table for Real Estate Application

  ## Summary
  This migration creates the core properties table for storing real estate listings
  with comprehensive property information, dealer details, and image storage.

  ## New Tables
  1. `properties`
    - `id` (uuid, primary key) - Unique identifier for each property
    - `title` (text) - Property title/name
    - `description` (text) - Detailed property description
    - `price` (numeric) - Property price in dollars
    - `size` (numeric) - Property size in square feet
    - `bedrooms` (integer) - Number of bedrooms
    - `bathrooms` (numeric) - Number of bathrooms
    - `property_type` (text) - Type (House, Apartment, Condo, etc.)
    - `status` (text) - Status (For Sale, For Rent, Sold)
    - `address` (text) - Street address
    - `city` (text) - City name
    - `state` (text) - State/Province
    - `zip_code` (text) - Postal code
    - `latitude` (numeric) - GPS latitude for map display
    - `longitude` (numeric) - GPS longitude for map display
    - `images` (text array) - Array of image URLs
    - `featured` (boolean) - Whether property is featured on homepage
    - `dealer_name` (text) - Property dealer/agent name
    - `dealer_email` (text) - Dealer email address
    - `dealer_phone` (text) - Dealer phone number
    - `created_at` (timestamptz) - Record creation timestamp
    - `updated_at` (timestamptz) - Last update timestamp
    - `created_by` (uuid) - Reference to admin user who created listing

  ## Security
  - Enable RLS on `properties` table
  - Add policy for public read access to all properties
  - Add policy for authenticated admins to insert properties
  - Add policy for authenticated admins to update properties
  - Add policy for authenticated admins to delete properties

  ## Notes
  - Public users can view all property listings
  - Only authenticated admin users can manage (create/update/delete) properties
  - Images stored as array of URLs (can be Supabase Storage URLs)
  - Geographic coordinates enable map integration
  - Featured flag allows highlighting properties on homepage
*/

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  size numeric NOT NULL CHECK (size > 0),
  bedrooms integer NOT NULL CHECK (bedrooms >= 0),
  bathrooms numeric NOT NULL CHECK (bathrooms >= 0),
  property_type text NOT NULL DEFAULT 'House',
  status text NOT NULL DEFAULT 'For Sale',
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  latitude numeric,
  longitude numeric,
  images text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  dealer_name text NOT NULL,
  dealer_email text NOT NULL,
  dealer_phone text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view all properties (public read access)
CREATE POLICY "Anyone can view properties"
  ON properties FOR SELECT
  USING (true);

-- Policy: Authenticated users can insert properties
CREATE POLICY "Authenticated users can insert properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Policy: Authenticated users can update properties they created
CREATE POLICY "Authenticated users can update own properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Policy: Authenticated users can delete properties they created
CREATE POLICY "Authenticated users can delete own properties"
  ON properties FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);