/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.boringavatars.com',
        port: '',
        pathname: '/marble/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
