// src/app/page.tsx

'use client';

import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import EthBalance from './components/EthBalance';
import TransferForm from './components/TransferForm';
import TransactionHistory from './components/TransactionHistory';  // Import TransactionHistory
import { BrowserProvider } from 'ethers';  // ethers.js v6

const HomePage: React.FC = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [provider, setProvider] = useState<BrowserProvider | null>(null);  // Store the provider here
    const [refresh, setRefresh] = useState<boolean>(false);  // Add refresh state

    // Function to trigger history refresh
    const refreshHistory = () => {
        setRefresh(prev => !prev);  // Toggle the refresh state to trigger useEffect in TransactionHistory
    };

    return (
        <div>
            <h1>Scroll Simple Transfer DApp</h1>
            {/* Pass walletAddress and provider to WalletConnect */}
            <WalletConnect walletAddress={walletAddress} setWalletAddress={setWalletAddress} setProvider={setProvider} />

            {walletAddress && provider && (
                <>
                    <EthBalance walletAddress={walletAddress} provider={provider} />
                    <TransferForm walletAddress={walletAddress} provider={provider} refreshHistory={refreshHistory} />
                    <TransactionHistory refresh={refresh} />  {/* Pass refresh prop */}
                </>
            )}
        </div>
    );
};

export default HomePage;
