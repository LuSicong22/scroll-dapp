'use client';

import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import EthBalance from './components/EthBalance';
import TransferForm from './components/TransferForm';
import TransactionHistory from './components/TransactionHistory';

const HomePage: React.FC = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    return (
        <div>
            <h1>Simple Transfer DApp</h1>
            <WalletConnect walletAddress={walletAddress} setWalletAddress={setWalletAddress} />
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
