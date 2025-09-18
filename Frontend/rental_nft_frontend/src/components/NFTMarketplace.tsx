import React, { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

interface RentalDetails {
  ownerAddress: string;
  duration: number; // in seconds
}

const NFTMarketplace: React.FC = () => {
  const { connected, account, signAndSubmitTransaction } = useWallet();
  const [rentalDetails, setRentalDetails] = useState<RentalDetails>({
    ownerAddress: '',
    duration: 3600 // 1 hour default
  });
  const [loading, setLoading] = useState(false);

  // Initialize Aptos client
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);

  // Replace with YOUR deployed contract address
  const MODULE_ADDRESS = "0x64545ff0d675fdb59124bf3dd3ab4e81deb675f542ad69641169db49a39775b0";

  const handleRentNFT = async () => {
    if (!connected || !account) {
      alert('Please connect your wallet first');
      return;
    }

    if (!rentalDetails.ownerAddress) {
      alert('Please enter the NFT owner address');
      return;
    }

    setLoading(true);
    try {
      const transaction = {
        data: {
          function: `${MODULE_ADDRESS}::RentableNFT::rent_nft`,
          functionArguments: [
            rentalDetails.ownerAddress, // nft_owner: address
            rentalDetails.duration       // duration: u64 (in seconds)
          ]
        }
      };

      const pendingTxn = await signAndSubmitTransaction(transaction);
      
      // Wait for transaction confirmation
      await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
      
      alert(`NFT rented successfully! Transaction: ${pendingTxn.hash}`);
      
      // Reset form
      setRentalDetails({
        ownerAddress: '',
        duration: 3600
      });
      
    } catch (error) {
      console.error('Error renting NFT:', error);
      alert('Failed to rent NFT. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="nft-marketplace-card">
      <h2>🏪 Rent NFT</h2>
      
      <div className="form-group">
        <label htmlFor="ownerAddress">NFT Owner Address:</label>
        <input
          id="ownerAddress"
          type="text"
          value={rentalDetails.ownerAddress}
          onChange={(e) => setRentalDetails({
            ...rentalDetails,
            ownerAddress: e.target.value
          })}
          placeholder="Enter NFT owner's address (0x...)"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="duration">Rental Duration:</label>
        <select
          id="duration"
          value={rentalDetails.duration}
          onChange={(e) => setRentalDetails({
            ...rentalDetails,
            duration: parseInt(e.target.value)
          })}
          disabled={loading}
        >
          <option value={3600}>1 Hour</option>
          <option value={7200}>2 Hours</option>
          <option value={21600}>6 Hours</option>
          <option value={86400}>1 Day</option>
          <option value={604800}>1 Week</option>
        </select>
        <small>Selected: {formatDuration(rentalDetails.duration)}</small>
      </div>

      <button 
        className="rent-nft-btn"
        onClick={handleRentNFT}
        disabled={!connected || loading}
      >
        {loading ? 'Renting...' : 'Rent NFT'}
      </button>

      {!connected && (
        <p className="warning">Please connect your wallet to rent NFTs</p>
      )}
    </div>
  );
};

export default NFTMarketplace;
