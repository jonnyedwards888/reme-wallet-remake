# ReMe Wallet

## Description

ReMe Wallet is a comprehensive web application that serves as a dashboard for ReMeLife users to manage their tokens, view balances, and interact with the healthcare tokenization platform. Built with React, TypeScript, and modern web technologies.

## Features

- **User Authentication**: Login and registration with referral system
- **Wallet Management**: View token balances and wallet addresses
- **Transaction Management**: Claim transactions and handle insufficient balances
- **Security**: Mnemonic phrase management and wallet recovery
- **Password Management**: Password reset and new password setup
- **Token Conversion**: Convert CAPs tokens
- **Responsive Design**: Mobile-friendly interface

## Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- pnpm (recommended package manager)

## Installation & Setup

### Using pnpm (Recommended)
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Using npm
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start development server on port 3000 |
| `start` | Start production server on port 3000 |
| `build` | Build the application for production |
| `build:analyze` | Build with bundle analysis |
| `build:fast` | Fast build without source maps |
| `test` | Run tests with coverage |
| `test:watch` | Run tests in watch mode |
| `lint` | Run ESLint |
| `lint:fix` | Fix ESLint issues automatically |
| `clean` | Clean build cache |
| `type-check` | Run TypeScript type checking |

## Development

### Starting the Application
```bash
# Development mode
npm run dev
# or
pnpm dev

# Production mode
npm run start
# or
pnpm start
```

### Accessing the Application
- **Development**: http://localhost:3000
- **Production**: Configure your deployment URL

## Application Routes

- `/` - Login page
- `/registration/:referredBy` - Registration with referral
- `/dashboard` - Main dashboard
- `/mnemonic` - Mnemonic phrase management
- `/claim` - Claim transactions
- `/insufficient-balance` - Handle insufficient balance
- `/forgotten-password` - Password recovery
- `/new-password/:id/:time/:token` - Set new password
- `/wallet-recovery` - Wallet recovery process
- `/convert-caps` - Token conversion

## Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: SCSS, Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **UI Components**: Radix UI, Lucide React
- **Blockchain**: Ethers.js
- **Build Tool**: Create React App
- **Package Manager**: pnpm (recommended)

## Deployment

### Firebase Hosting
This project is configured for Firebase Hosting deployment:

```bash
# Build the application
npm run build

# Deploy to Firebase
firebase deploy
```

### Production Deployment Steps
1. Clone the project locally
2. Checkout to the staging branch
3. Configure environment variables
4. Build the application: `npm run build`
5. Deploy to your hosting platform
6. Monitor deployment at: https://github.com/ReMe-life/ReMe-Wallet/actions

## Environment Configuration

Create a `.env` file in the root directory with the following variables:
```
REACT_APP_API_URL=your_api_url
REACT_APP_FIREBASE_CONFIG=your_firebase_config
# Add other environment variables as needed
```

## Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run type checking
npm run type-check
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please refer to the project documentation or create an issue in the repository.
