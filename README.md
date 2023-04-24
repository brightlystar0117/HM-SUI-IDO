# IDO Contract on SUI Blockchain

This contract enables Initial DEX Offerings (IDOs) on the SUI blockchain. An IDO is a decentralized fundraising mechanism for new crypto projects, where participants can contribute funds and receive newly minted tokens in return.

## Features

The IDO contract has the following features:

**Whitelist**: The IDO owner can maintain a whitelist of addresses that are allowed to participate in the IDO. Participants who are not on the whitelist will be rejected.
**Funding Cap**: The IDO owner can set a funding cap for the IDO, beyond which no more funds will be accepted.
**Start and End Time**: The IDO owner can set a start and end time for the IDO, during which participants can contribute funds.
**Funds Transfer**: When a participant contributes funds to the IDO, the funds are transferred to the IDO owner's account and the participant receives newly minted tokens in return.

## Usage

### Creating an IDO

To create an IDO, call the **create_ido** function with the following parameters:

- **start_time**: The start time of the IDO, in Unix timestamp format.
- **end_time**: The end time of the IDO, in Unix timestamp format.
- **whitelisted_addresses**: A list of addresses that are allowed to participate in the IDO.
- **ctx**: A mutable reference to the TxContext object.

### Participating in an IDO

To participate in an IDO, first check that you are on the whitelist by calling the **is_whitelisted** function with the following parameters:

- **ido**: A mutable reference to the IDO object.
- **address**: Your SUI Wallet Address.

If you are on the whitelist, you can contribute funds to the IDO by calling the **fund_ido** function with the following parameters:

- **ido**: A mutable reference to the IDO object.
- **amount**: The amount of SUI tokens you want to contribute.
- **ctx**: A mutable reference to the TxContext object.
- **clock**: A mutable reference to the Clock object.

### Transfer Funds

After the end of the IDO, the IDO owner can transfer the funds raised by calling the **transfer_funds** function with the following parameters:

- **ido**: A mutable reference to the IDO object.
- **amount**: The amount of SUI tokens the IDO owner wants to withdraw or transfer.
- **ctx**: A mutable reference to the TxContext object.

### Checking the Whitelisted Address of the IDO

To check the **whitelisted_addresses** of the IDO, you can call the following functions:

- **is_whitelisted**: Checks if an address is on the IDO whitelist.

## Deployed on SUI Testnet

### SUI Explorer

- [SUI Testnet](https://explorer.sui.io/object/0x7a397566abee80f9ecfef31e3e98cae7f9af0fb684cb6f3f9ba8ad43ede766fb)

## Run Locally

Clone the project

```bash
git clonegit@github.com:karangorania/Block-Chain-Full-stack.git
```

Go to the project directory

```bash
cd Block-Chain-Full-stack
```

Checkout to feature branch

```bash
git checkout feature
```

Install dependencies

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

```bash
npm run dev
npm run build
npm run start
```

For SUI Contract Build

PS: You need **Rust**, **Move** & **SUI Binaries** install on your system.

```bash
sui move build
```

```bash
sui client publish --gas-budget 1000
```
