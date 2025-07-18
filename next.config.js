/** @type {import('next').NextConfig} */
const nextConfig = {
  // Context7 Configuration
  experimental: {
    optimizeCss: true,
    serverComponentsExternalPackages: [],
    optimizePackageImports: ['@radix-ui/react-slot', 'lucide-react'],
  },
  
  // Disable static generation for pages with client components
  trailingSlash: false,
  
  // Context7 Performance Optimizations
  compress: true,
  poweredByHeader: false,
  
  // Context7 Image Optimization
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Context7 Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Basic fallbacks
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Add browser globals fallback for SSR
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        self: false,
        window: false,
        document: false,
        navigator: false,
        location: false,
        history: false,
        localStorage: false,
        sessionStorage: false,
      };
    }

    // Development optimizations
    if (dev) {
      // Reduce console noise
      config.infrastructureLogging = {
        level: 'error',
      };
      
      // Optimize HMR
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
      
      // Memory cache for faster rebuilds
      config.cache = {
        type: 'memory',
        maxGenerations: 1,
      };
    }

    // Production optimizations
    if (!dev) {
      // Optimize chunk splitting
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },

  // Reduce console output
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

module.exports = nextConfig;
