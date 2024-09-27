// src/app/page.tsx

'use client';  // Add this line to mark this as a Client Component

import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import EthBalance from './components/EthBalance';
import TransferForm from './components/TransferForm';
import TransactionHistory from './components/TransactionHistory';

const HomePage: React.FC = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    return (
        <div>
            <h1>Scroll Simple Transfer DApp</h1>
            <WalletConnect />
            {walletAddress && (
                <>
                    <EthBalance walletAddress={walletAddress} />
                    <TransferForm walletAddress={walletAddress} />
                    <TransactionHistory />
                </>
            )}
        </div>
    );
};

export default HomePage;
