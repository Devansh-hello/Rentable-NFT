module MyModule::RentableNFT {

    use aptos_framework::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::timestamp;

    /// Struct representing a rentable NFT.
    struct RentableNFT has store, key {
        owner: address,           // Original owner of the NFT
        current_renter: address,  // Current renter (0x0 if not rented)
        rental_price: u64,        // Price per rental period
        rental_end_time: u64,     // When current rental expires
        nft_id: u64,             // Unique NFT identifier
    }

    /// Function to create a new rentable NFT.
    public fun create_rentable_nft(owner: &signer, nft_id: u64, rental_price: u64) {
        let owner_addr = signer::address_of(owner);
        let rentable_nft = RentableNFT {
            owner: owner_addr,
            current_renter: @0x0,  // No renter initially
            rental_price,
            rental_end_time: 0,    // No rental period initially
            nft_id,
        };
        move_to(owner, rentable_nft);
    }

    /// Function to rent an NFT for a specified duration (in seconds).
    public fun rent_nft(renter: &signer, nft_owner: address, duration: u64) acquires RentableNFT {
        let nft = borrow_global_mut<RentableNFT>(nft_owner);
        let current_time = timestamp::now_seconds();
        
        // Check if NFT is currently available for rent
        assert!(nft.current_renter == @0x0 || current_time > nft.rental_end_time, 1);

        let renter_addr = signer::address_of(renter);
        
        // Transfer rental payment to NFT owner
        let payment = coin::withdraw<AptosCoin>(renter, nft.rental_price);
        coin::deposit<AptosCoin>(nft_owner, payment);

        // Update rental information
        nft.current_renter = renter_addr;
        nft.rental_end_time = current_time + duration;
    }
}
