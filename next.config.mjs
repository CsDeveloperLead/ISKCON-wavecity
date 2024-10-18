/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RAZORPAY_KEY: "rzp_test_1DP5mmOlF5G5ag",
    RAZORPAY_SECRET: "TpqNrmU3Bwv6UptBYZspKqBn",
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

export default nextConfig;
