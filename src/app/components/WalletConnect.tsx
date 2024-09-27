import React, { useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';  // Updated for ethers v6

interface WalletConnectProps {
    walletAddress: string | null;
    setWalletAddress: (address: string | null) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ walletAddress, setWalletAddress }) => {
    const [provider, setProvider] = useState<BrowserProvider | null>(null);  // BrowserProvider for ethers v6

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                // Initialize ethers provider using MetaMask's injected provider (window.ethereum)
                const ethersProvider = new BrowserProvider(window.ethereum);
                setProvider(ethersProvider);

                // Request account access from MetaMask
                const accounts = await ethersProvider.send('eth_requestAccounts', []);
                setWalletAddress(accounts[0]);

            } catch (error) {
                console.error('Failed to connect wallet:', error);
            }
        } else {
            alert('MetaMask is required to connect the wallet.');
        }
    };

    const disconnectWallet = () => {
        setWalletAddress(null);
        setProvider(null);
    };

    return (
        <div>
            {walletAddress ? (
                <div>
                    <p>Connected Wallet: {walletAddress}</p>
                    <button onClick={disconnectWallet}>Disconnect</button>
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletConnect;
