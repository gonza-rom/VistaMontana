/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wevedxzldtanroyshimn.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Para imágenes locales en /public
    unoptimized: false,
  },
};

export default nextConfig;