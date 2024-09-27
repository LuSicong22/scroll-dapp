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
    const [balance, setBalance] = useState<string>('0');

    // Function to trigger history refresh
    const refreshHistory = () => {
        setRefresh(prev => !prev);  // Toggle the refresh state to trigger useEffect in TransactionHistory
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <header className="py-8">
                <h1 className="text-4xl font-bold text-indigo-600">Scroll Simple Transfer DApp</h1>
            </header>

            <main className="w-full max-w-4xl px-4 space-y-8">
                {/* Wallet Connection Section */}
                    <WalletConnect walletAddress={walletAddress} setWalletAddress={setWalletAddress} setProvider={setProvider} />

                {walletAddress && provider && (
                    <>
                        {/* Balance Display */}
                        <EthBalance walletAddress={walletAddress} provider={provider} balance={balance}
                                    setBalance={setBalance}/>

                        {/* Transfer Form */}
                            <TransferForm
                                walletAddress={walletAddress}
                                provider={provider}
                                refreshHistory={refreshHistory}
                                balance={balance}
                            />
                            {/* Transaction History */}

                            <TransactionHistory refresh={refresh}/>

                    </>
                )}
            </main>

            <footer className="py-8">
                <p className="text-gray-500 text-center">© 2023 Scroll Simple Transfer DApp</p>
            </footer>
        </div>
    );
};

export default HomePage;
