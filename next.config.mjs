/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'vou.blob.core.windows.net',
            },
        ],
    },
}

export default nextConfig
