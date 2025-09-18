import React, { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

const CreateNFT: React.FC = () => {
  const { connected, signAndSubmitTransaction } = useWallet();
  const [nftId, setNftId] = useState<string>('');
  const [rentalPrice, setRentalPrice] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Initialize Aptos client
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);

  // Replace with YOUR deployed contract address
  const MODULE_ADDRESS = "0x64545ff0d675fdb59124bf3dd3ab4e81deb675f542ad69641169db49a39775b0";

  const handleCreateNFT = async () => {
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!nftId || !rentalPrice) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const transaction = {
        data: {
          function: `${MODULE_ADDRESS}::RentableNFT::create_rentable_nft`,
          functionArguments: [
            parseInt(nftId), // nft_id: u64
            parseInt(rentalPrice) * 100000000 // rental_price in Octas (APT * 10^8)
          ]
        }
      };

      const pendingTxn = await signAndSubmitTransaction(transaction);
      
      // Wait for transaction confirmation
      await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
      
      alert(`NFT created successfully! Transaction: ${pendingTxn.hash}`);
      
      // Reset form
      setNftId('');
      setRentalPrice('');
      
    } catch (error) {
      console.error('Error creating NFT:', error);
      alert('Failed to create NFT. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-nft-card">
      <h2>🎨 Create Rentable NFT</h2>
      
      <div className="form-group">
        <label htmlFor="nftId">NFT ID:</label>
        <input
          id="nftId"
          type="number"
          value={nftId}
          onChange={(e) => setNftId(e.target.value)}
          placeholder="Enter unique NFT ID (e.g., 1001)"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="rentalPrice">Rental Price (APT):</label>
        <input
          id="rentalPrice"
          type="number"
          step="0.01"
          value={rentalPrice}
          onChange={(e) => setRentalPrice(e.target.value)}
          placeholder="Enter rental price (e.g., 0.5)"
          disabled={loading}
        />
      </div>

      <button 
        className="create-nft-btn"
        onClick={handleCreateNFT}
        disabled={!connected || loading}
      >
        {loading ? 'Creating...' : 'Create Rentable NFT'}
      </button>

      {!connected && (
        <p className="warning">Please connect your wallet to create NFTs</p>
      )}
    </div>
  );
};

export default CreateNFT;
