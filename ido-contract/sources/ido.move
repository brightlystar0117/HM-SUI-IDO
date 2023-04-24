module MyIDO::IDO { 

    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::object::{Self, UID};
    use sui::sui::SUI;
    use sui::transfer;
    use sui::clock::{Self, Clock};
    use sui::tx_context::{Self, TxContext};
    use std::vector;

    struct IDO has key, store {
        id: UID,
        start_time: u64,
        end_time: u64,
        cap: u64,
        owner: address,
        whitelisted_addresses: vector<address>,
        funded_amount: u64,
        balance: Balance<SUI>
    }

    /// Total Supply
    const MAX_CAP: u64 = 21000000;

    // Errors define 
    const NOT_WHITELIST: u64 = 1;
    const NOT_STARTED: u64 = 2;
    const MAX_CAP_REACHED: u64 = 3;
    const OWNER_ONLY: u64 = 4; 



    // it will create the IDO 
    public entry fun create_ido(
        start_time: u64,
        end_time: u64,
        // cap: u64,
        whitelisted_addresses: vector<address>,
        ctx: &mut TxContext
    ) {
        let owner = tx_context::sender(ctx);
         let ido = IDO {
            id: object::new(ctx),
            start_time: start_time,
            end_time: end_time,
            cap: MAX_CAP,
            owner: owner,
            whitelisted_addresses: whitelisted_addresses,
            funded_amount: 0,
            balance: balance::zero()
        };
        transfer::transfer(ido, owner);
    }


    // Check if an address is whitelisted
    public fun is_whitelisted(ido: &IDO, address: address): bool {
        vector::contains(&ido.whitelisted_addresses, &address)
    }

    //Fund the IDO 
    public entry fun fund_ido(ido: &mut IDO, payment: Coin<SUI>, clock: &Clock, ctx: &mut TxContext) {
        let sender = tx_context::sender(ctx);
        assert!(is_whitelisted(ido, sender), NOT_WHITELIST);

        // For fetching time 
        let current_time = clock::timestamp_ms(clock);

        assert!(current_time >= ido.start_time && current_time <= ido.end_time, NOT_STARTED);

        let amount = coin::value(&payment);
        assert!(ido.funded_amount + amount <= ido.cap, MAX_CAP_REACHED);

        ido.funded_amount = ido.funded_amount + amount;

        coin::put(&mut ido.balance, payment);

    }

    // It will transfer the funds only owner can transfer
    public entry fun transfer_ido_funds(ido: &mut IDO, recipient: address, ctx: &mut TxContext) {
        let sender = tx_context::sender(ctx); 
        assert!(ido.owner == sender, OWNER_ONLY); 
        let amount = balance::value(&ido.balance);
        let split_amount = balance::split(&mut ido.balance, amount);

        transfer::public_transfer(coin::from_balance(split_amount, ctx), recipient);
    }

}



