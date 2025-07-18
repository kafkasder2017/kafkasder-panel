# KAFKASDER Admin - Scripts Guide

This guide explains all the available npm scripts in the KAFKASDER admin panel project.

## 🚀 Development Scripts

### `npm run dev`
Starts the development server with hot reloading.
```bash
npm run dev
```

### `npm run build`
Creates a production build of the application.
```bash
npm run build
```

### `npm run start`
Starts the production server (must run `build` first).
```bash
npm run start
```

## 🔍 Code Quality Scripts

### `npm run lint`
Runs ESLint to check for code quality issues.
```bash
npm run lint
```

### `npm run lint:fix`
Automatically fixes ESLint issues where possible.
```bash
npm run lint:fix
```

### `npm run type-check`
Runs TypeScript compiler to check for type errors without emitting files.
```bash
npm run type-check
```

### `npm run format`
Formats all code files using Prettier.
```bash
npm run format
```

### `npm run format:check`
Checks if all files are properly formatted without making changes.
```bash
npm run format:check
```

## 🧹 Maintenance Scripts

### `npm run clean`
Removes build artifacts and cache directories.
```bash
npm run clean
```

### `npm run analyze`
Builds the application with bundle analysis (requires `@next/bundle-analyzer`).
```bash
npm run analyze
```

## 🗄️ Database Scripts

### `npm run db:generate-types`
Generates TypeScript types from your Supabase database schema.
```bash
# First, replace YOUR_PROJECT_ID with your actual Supabase project ID
npm run db:generate-types
```

### `npm run db:push`
Pushes local schema changes to your Supabase database.
```bash
npm run db:push
```

### `npm run db:reset`
Resets your local Supabase database (⚠️ Destructive).
```bash
npm run db:reset
```

### `npm run db:migrate`
Applies pending migrations to your database.
```bash
npm run db:migrate
```

### `npm run db:new-migration`
Creates a new migration file.
```bash
npm run db:new-migration
```

## 🧪 Testing Scripts

### `npm run test`
Runs the test suite (currently placeholder).
```bash
npm run test
```

### `npm run test:watch`
Runs tests in watch mode (currently placeholder).
```bash
npm run test:watch
```

## 🚀 Deployment Scripts

### `npm run vercel-build`
Build script specifically for Vercel deployment.
```bash
npm run vercel-build
```

## 🔄 Post-Install Scripts

### `npm run postinstall`
Automatically runs after `npm install` to check types.
```bash
# This runs automatically after npm install
```

## 📋 Common Workflows

### Daily Development Workflow
```bash
# 1. Start development server
npm run dev

# 2. In another terminal, check for issues
npm run lint
npm run type-check

# 3. Format code before committing
npm run format
```

### Pre-Commit Checklist
```bash
# 1. Check for linting issues
npm run lint

# 2. Check for type errors
npm run type-check

# 3. Format code
npm run format

# 4. Build to ensure everything works
npm run build
```

### Database Schema Updates
```bash
# 1. Create a new migration
npm run db:new-migration

# 2. Apply migrations
npm run db:migrate

# 3. Generate updated types
npm run db:generate-types

# 4. Check for type errors
npm run type-check
```

### Production Deployment
```bash
# 1. Clean previous builds
npm run clean

# 2. Install dependencies
npm install

# 3. Build for production
npm run build

# 4. Start production server
npm run start
```

## 🔧 Configuration Files

### `.prettierrc`
Prettier configuration for code formatting.

### `.prettierignore`
Files and directories to exclude from Prettier formatting.

### `eslint.config.mjs`
ESLint configuration for code linting.

### `tsconfig.json`
TypeScript configuration for type checking.

## 📝 Notes

- **React Version**: This project uses React 19, which may cause peer dependency warnings with some packages. Use `--legacy-peer-deps` if needed.
- **Supabase**: Make sure you have the Supabase CLI installed and configured for database scripts.
- **Environment Variables**: Ensure all required environment variables are set before running scripts.

## 🆘 Troubleshooting

### Common Issues

1. **Peer Dependency Warnings**: Use `npm install --legacy-peer-deps`
2. **Type Errors**: Run `npm run type-check` to identify issues
3. **Build Failures**: Try `npm run clean` before rebuilding
4. **Database Issues**: Ensure Supabase CLI is properly configured

### Getting Help

If you encounter issues with any scripts:
1. Check the console output for specific error messages
2. Ensure all dependencies are installed: `npm install`
3. Try cleaning and rebuilding: `npm run clean && npm run build`
4. Check the project documentation for specific setup requirements 