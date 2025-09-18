# 🎨 RentableNFT - Aptos Smart Contract & React Frontend

A decentralized NFT rental marketplace built on the Aptos blockchain using Move smart contracts and React frontend. Users can create rentable NFTs and rent them for specified durations with automatic payment processing.

## 📁 Project Structure

```
rentable-nft-marketplace/
├── move/
│   ├── sources/
│   │   └── RentableNFT.move
│   ├── Move.toml
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WalletConnector.tsx
│   │   │   ├── CreateNFT.tsx
│   │   │   └── NFTMarketplace.tsx
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── index.tsx
│   ├── package.json
│   └── public/
└── README.md
```

## 🚀 Features

### Smart Contract Features
- **Create Rentable NFTs**: Deploy NFTs with customizable rental prices
- **Time-based Rentals**: Rent NFTs for specific durations (seconds to weeks)
- **Automatic Payments**: Seamless APT token transfers between renters and owners
- **Rental Status Tracking**: Real-time tracking of rental periods and availability
- **Owner Protection**: Only owners can create NFTs, secure rental management

### Frontend Features
- **Wallet Integration**: Connect with Petra and other Aptos wallets
- **Modern UI**: Clean, professional interface with responsive design
- **Real-time Updates**: Live transaction status and confirmations
- **User-friendly Forms**: Intuitive NFT creation and rental processes
- **Error Handling**: Comprehensive error management and user feedback

## 🛠️ Technology Stack

### Smart Contract
- **Language**: Move
- **Blockchain**: Aptos Testnet/Devnet
- **Framework**: Aptos Framework

### Frontend
- **Framework**: React 18+ with TypeScript
- **Styling**: Modern CSS with Inter font
- **Wallet Adapter**: @aptos-labs/wallet-adapter-react
- **Blockchain SDK**: @aptos-labs/ts-sdk
- **Build Tool**: Create React App

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Aptos CLI** (latest version)
- **Git**
- **Petra Wallet** browser extension

### Installing Aptos CLI

#### macOS/Linux:
```bash
curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3
```

#### Windows:
Download from [Aptos CLI Releases](https://github.com/aptos-labs/aptos-core/releases)

Verify installation:
```bash
aptos --version
```

## 🏗️ Smart Contract Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/rentable-nft-marketplace.git
cd rentable-nft-marketplace
```

### 2. Initialize Aptos Account
```bash
cd move
aptos init
```
- Select network: `devnet` or `testnet`
- Choose to create a new account: `yes`
- This creates `.aptos/config.yaml` with your account details

### 3. Configure Move.toml
Update `move/Move.toml`:
```toml
[package]
name = 'RentableNFT'
version = '1.0.0'
authors = ['Your Name <your.email@example.com>']

[addresses]
MyModule = "_"  # This will use your default account address

[dev-addresses]
MyModule = "0xC0FFEE"  # Alternative address for testing

[dependencies.AptosFramework]
git = 'https://github.com/aptos-labs/aptos-core.git'
rev = 'main'
subdir = 'aptos-move/framework/aptos-framework'
```

### 4. Get Testnet Funds
Visit [Aptos Testnet Faucet](https://faucet.devnet.aptoslabs.com/) and fund your account with test APT tokens.

### 5. Compile the Contract
```bash
aptos move compile --package-dir .
```

### 6. Test the Contract (Optional)
```bash
aptos move test --package-dir .
```

### 7. Deploy the Contract
```bash
aptos move publish --package-dir .
```

**Important**: Save the contract address from the deployment output - you'll need it for the frontend!

## 🖥️ Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd ../frontend
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Install Required Packages
```bash
npm install @aptos-labs/wallet-adapter-react @aptos-labs/ts-sdk
```

### 4. Update Contract Address
In both `CreateNFT.tsx` and `NFTMarketplace.tsx`, replace:
```typescript
const MODULE_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
```
With your actual deployed contract address.

### 5. Start the Development Server
```bash
npm start
# or
yarn start
```

The application will open at `http://localhost:3000`

## 📖 Smart Contract API

### Contract Address
Replace `YOUR_MODULE_ADDRESS` with your deployed contract address.

### Functions

#### `create_rentable_nft`
Creates a new rentable NFT.

**Parameters:**
- `owner: &signer` - The NFT creator/owner
- `nft_id: u64` - Unique identifier for the NFT
- `rental_price: u64` - Rental price in Octas (1 APT = 10^8 Octas)

**Usage:**
```typescript
const transaction = {
  data: {
    function: `${MODULE_ADDRESS}::RentableNFT::create_rentable_nft`,
    functionArguments: [nftId, rentalPriceInOctas]
  }
};
```

#### `rent_nft`
Rents an available NFT for a specified duration.

**Parameters:**
- `renter: &signer` - The account renting the NFT
- `nft_owner: address` - Address of the NFT owner
- `duration: u64` - Rental duration in seconds

**Usage:**
```typescript
const transaction = {
  data: {
    function: `${MODULE_ADDRESS}::RentableNFT::rent_nft`,
    functionArguments: [ownerAddress, durationInSeconds]
  }
};
```

## 🎯 How to Use

### For NFT Creators:
1. **Connect Wallet**: Click "Connect Wallet" and approve connection
2. **Create NFT**: 
   - Enter unique NFT ID (e.g., 1001)
   - Set rental price in APT (e.g., 0.5)
   - Click "Create Rentable NFT"
   - Confirm transaction in wallet

### For NFT Renters:
1. **Connect Wallet**: Ensure you have APT tokens for payment
2. **Rent NFT**:
   - Enter the NFT owner's address
   - Select rental duration (1 hour to 1 week)
   - Click "Rent NFT"
   - Confirm payment transaction

### Rental Durations Available:
- **1 Hour**: 3,600 seconds
- **2 Hours**: 7,200 seconds  
- **6 Hours**: 21,600 seconds
- **1 Day**: 86,400 seconds
- **1 Week**: 604,800 seconds

## 🧪 Testing

### Smart Contract Testing
```bash
cd move
aptos move test --package-dir .
```

### Frontend Testing
```bash
cd frontend
npm test
# or
yarn test
```

### Manual Testing Flow
1. **Deploy Contract**: Ensure contract is deployed successfully
2. **Create Test NFT**: Use the frontend to create an NFT
3. **Verify Creation**: Check transaction on [Aptos Explorer](https://explorer.aptoslabs.com/)
4. **Test Rental**: Rent your own NFT from a different account
5. **Verify Payment**: Confirm APT transfer occurred

## 🔧 Configuration

### Network Configuration
Update network in `App.tsx`:
```typescript
<AptosWalletAdapterProvider
  dappConfig={{
    network: Network.TESTNET, // or Network.DEVNET
  }}
>
```

### Styling Customization
Modify `App.css` to customize:
- Color scheme
- Typography
- Component layouts
- Responsive breakpoints

## 🐛 Troubleshooting

### Common Issues:

#### 1. "Account doesn't exist" Error
- **Solution**: Fund your account using the testnet faucet
- **Check**: Verify account address in `.aptos/config.yaml`

#### 2. "Insufficient Balance" Error
- **Solution**: Get more test APT from the faucet
- **Check**: Confirm you're on the correct network (testnet/devnet)

#### 3. Wallet Connection Issues
- **Solution**: Install and setup Petra Wallet
- **Check**: Enable the extension and create/import an account

#### 4. Contract Address Not Found
- **Solution**: Update `MODULE_ADDRESS` in React components
- **Check**: Use the address from your deployment transaction

#### 5. Transaction Failures
- **Solution**: Check gas fees and account balance
- **Debug**: Review transaction details on Aptos Explorer

### Debug Mode
Enable debug mode by adding console logs:
```typescript
console.log('Account:', account);
console.log('Transaction:', transaction);
```

## 🚀 Deployment

### Smart Contract Production Deployment
1. **Switch to Mainnet**: Update network to `mainnet` in commands
2. **Fund Account**: Get real APT tokens
3. **Deploy**: Use `aptos move publish --package-dir . --profile mainnet`

### Frontend Production Deployment

#### Netlify/Vercel:
```bash
npm run build
# Deploy dist/ folder
```

#### GitHub Pages:
```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Aptos, Move, and React**

*Happy coding! 🚀*
