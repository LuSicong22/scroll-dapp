'use client';

import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import EthBalance from './components/EthBalance';
import TransferForm from './components/TransferForm';
import TransactionHistory from './components/TransactionHistory';
import { BrowserProvider } from 'ethers';

const HomePage: React.FC = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [provider, setProvider] = useState<BrowserProvider | null>(null);  // Store the provider here

    return (
        <div>
            <h1>Simple Transfer DApp</h1>

            <WalletConnect walletAddress={walletAddress} setWalletAddress={setWalletAddress} setProvider={setProvider} />

            {walletAddress && provider && (
                <>
                    <EthBalance walletAddress={walletAddress}  provider={provider}/>
                    <TransferForm walletAddress={walletAddress} provider={provider}/>
                    <TransactionHistory />
                </>
            )}
        </div>
    );
};

export default HomePage;
