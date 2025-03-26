/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['i.scdn.co'], // Jika perlu memuat gambar dari Spotify
    },
  };

export default nextConfig;
