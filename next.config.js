/** @type {import('next').NextConfig} */
const nextConfig = {
  // Context7 Configuration
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-slot', 'lucide-react'],
  },
  
  // Server external packages (moved from experimental)
  serverExternalPackages: [],
  
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
  
  // Context7: Disable static optimization for dynamic content
  staticPageGenerationTimeout: 120,
  
  // Context7: Configure webpack for better bundle optimization
  webpack: (config, { dev, isServer }) => {
    // Context7: Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    }
    
    return config
  },

  // Reduce console output
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

module.exports = nextConfig;
