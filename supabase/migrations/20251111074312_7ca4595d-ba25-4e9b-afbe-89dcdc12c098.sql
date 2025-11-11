-- Create documents bucket for PDFs
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents', 
  'documents', 
  true,
  10485760, -- 10MB limit
  ARRAY['application/pdf']
);

-- Create images bucket for email images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images', 
  'images', 
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
);

-- Set RLS policies to allow public reads for documents bucket
CREATE POLICY "Public Read Access Documents" 
ON storage.objects
FOR SELECT 
TO public
USING (bucket_id = 'documents');

-- Set RLS policies to allow public reads for images bucket
CREATE POLICY "Public Read Access Images" 
ON storage.objects
FOR SELECT 
TO public
USING (bucket_id = 'images');

-- Allow authenticated users to upload documents (for admin purposes)
CREATE POLICY "Authenticated Upload Documents" 
ON storage.objects
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'documents');

-- Allow authenticated users to upload images (for admin purposes)
CREATE POLICY "Authenticated Upload Images" 
ON storage.objects
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'images');