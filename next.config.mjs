/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@react-pdf/renderer'],
    },
    reactStrictMode: false,
};

export default nextConfig;
