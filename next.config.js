/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com', // Allow Cloudinary images
      'hwqkadhjdnjyxjmtthvo.supabase.co', // Allow Supabase Storage images
    ],
  },
}

module.exports = nextConfig
