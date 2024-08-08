/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/photo-**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4000',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'api.turi-uzbekistana.ru',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'turi-uzbekistana.ru',
                pathname: '/images/**',
            },
        ],
    },
};

export default nextConfig;
