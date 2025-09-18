import React from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const WalletConnector: React.FC = () => {
  const { 
    connected, 
    account, 
    connect, 
    disconnect, 
    wallets 
  } = useWallet();

  const handleConnect = async () => {
    try {
      // Connect to the first available wallet (usually Petra)
      const availableWallet = wallets.find(wallet => wallet.readyState === 'Installed');
      if (availableWallet) {
        await connect(availableWallet.name);
      } else {
        alert('Please install Petra Wallet or another Aptos wallet');
        window.open('https://petra.app/', '_blank');
      }
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  if (connected && account) {
    return (
      <div className="wallet-info">
        <div className="account-info">
          <span className="account-address">
            {account.address.toString().slice(0, 6)}...{account.address.toString().slice(-4)}
          </span>
          <button className="disconnect-btn" onClick={disconnect}>
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <button className="connect-wallet-btn" onClick={handleConnect}>
      Connect Wallet
    </button>
  );
};

export default WalletConnector;
