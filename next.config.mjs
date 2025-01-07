// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // ✅ Keep strict mode off if needed
  output: "standalone", // ✅ Optimize for Azure Deployment
  eslint: {
    ignoreDuringBuilds: true, // ✅ Disables ESLint checks during builds
  },
  experimental: {
    optimizeCss: true, // ✅ Minifies CSS for smaller builds
  }
};

export default nextConfig; // ✅ Use `export default` for ES Modules

