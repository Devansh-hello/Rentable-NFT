import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";
import WalletConnector from './components/WalletConnector';
import NFTMarketplace from './components/NFTMarketplace';
import CreateNFT from './components/CreateNFT';
import './App.css';

function App() {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{
        network: Network.TESTNET,
        // Add your API key if you have one
        // aptosApiKey: "your-api-key-here"
      }}
      onError={(error) => {
        console.error("Wallet adapter error:", error);
      }}
    >
      <div className="App">
        <header className="App-header">
          <h1>🎨 RentableNFT Marketplace</h1>
          <WalletConnector />
        </header>
        
        <main className="container">
          <div className="grid">
            <CreateNFT />
            <NFTMarketplace />
          </div>
        </main>
      </div>
    </AptosWalletAdapterProvider>
  );
}

export default App;
