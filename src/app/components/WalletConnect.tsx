import React from 'react';
import { BrowserProvider } from 'ethers';

interface WalletConnectProps {
    walletAddress: string | null;
    setWalletAddress: (address: string | null) => void;
    setProvider: (provider: BrowserProvider | null) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ walletAddress, setWalletAddress, setProvider }) => {

    // Prompt to add the Scroll network to MetaMask
    const addScrollNetwork = async () => {
        const scrollNetwork = {
            chainId: '0x8274f',  // Scroll Layer 2 chain ID
            chainName: 'Scroll Sepolia Testnet',
            rpcUrls: ['https://sepolia-rpc.scroll.io'],  // Scroll Layer 2 RPC URL
            nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
            },
            blockExplorerUrls: ['https://scrollscan.com/'],
        };

        try {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [scrollNetwork],
            });
        } catch (error) {
            console.error('Failed to add Scroll network:', error);
        }
    };

    // Switch to Scroll Layer 2 network if it's not already active
    const switchToScrollL2 = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x82751' }],  // Scroll Layer 2 chain ID
            });
        } catch (error) {
            if (error.code === 4902) {
                // Network hasn't been added yet, so add it
                await addScrollNetwork();
            } else {
                console.error('Failed to switch to Scroll network:', error);
            }
        }
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                // Switch to Scroll L2
                await switchToScrollL2();

                // Create provider using MetaMask's injected provider
                const ethersProvider = new BrowserProvider(window.ethereum);
                setProvider(ethersProvider);

                // Request account access
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
