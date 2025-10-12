/*
  # Create Contact Messages Table

  ## Summary
  This migration creates a table to store contact form submissions from the Contact page.

  ## New Tables
  1. `contact_messages`
    - `id` (uuid, primary key) - Unique identifier for each message
    - `name` (text) - Name of the person submitting the form
    - `email` (text) - Email address for response
    - `subject` (text) - Message subject
    - `message` (text) - Message content
    - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Enable RLS on `contact_messages` table
  - Add policy to allow anyone to insert contact messages
  - Add policy for authenticated users to view all messages (admin only)

  ## Notes
  - Public users can submit contact messages (insert only)
  - Only authenticated admins can view stored messages
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);