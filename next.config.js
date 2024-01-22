/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "livebit.s3.ap-south-1.amazonaws.com"
            }
        ]
    }
}

module.exports = nextConfig
