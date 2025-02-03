module.exports = {
    // Enabling React Strict Mode
    reactStrictMode: true,
  
    // Custom Webpack configuration
    webpack: (config, { isServer }) => {
      // Example of adding custom Webpack loaders, plugins, etc.
      if (!isServer) {
        // Add polyfills or other client-side only libraries here
      }
      return config;
    },
  
    // Environment variables can be added here for both frontend and backend usage
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // public API URL
      NEXT_PUBLIC_JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET, // public JWT secret (for client-side usage)
    },
  
    // Next.js Image Optimization configuration
    images: {
      domains: ['example.com', 'cdn.example.com'], // Add domains if you're using external images
    },
  
    // Redirects, rewrites, or custom headers can be added here
    async redirects() {
      return [
        {
          source: '/old-route',
          destination: '/new-route',
          permanent: true,
        },
      ];
    },
  
    // Custom build directory
    distDir: 'build', // Optional: Change build output directory if you wish
  };
  