import React, { useState } from 'react';
import { BrowserProvider } from 'ethers';

interface WalletConnectProps {
    walletAddress: string | null;
    setWalletAddress: (address: string | null) => void;
    setProvider: (provider: BrowserProvider | null) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ walletAddress, setWalletAddress, setProvider }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);  // Loading state
    const [error, setError] = useState<string | null>(null);  // Error state

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
            setError('Failed to add Scroll network. Please try again.');
        }
    };

    // Switch to Scroll Layer 2 network if it's not already active
    const switchToScrollL2 = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x82751' }],  // Scroll Layer 2 chain ID
            });
        } catch (error: any) {
            if (error.code === 4902) {
                await addScrollNetwork();  // Network hasn't been added yet, so add it
            } else {
                console.error('Failed to switch to Scroll network:', error);
                setError('Failed to switch to Scroll network. Please try again.');
            }
        }
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            setIsLoading(true);
            setError(null);  // Reset error message
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
                setError('Failed to connect wallet. Please try again.');
            } finally {
                setIsLoading(false);
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
        <div className="p-6 bg-white shadow-md rounded-md text-center space-y-4">
            {walletAddress ? (
                <div>
                    <p className="text-lg font-medium text-gray-700">Connected Wallet: {walletAddress}</p>
                    <button
                        onClick={disconnectWallet}
                        className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 transition duration-300"
                    >
                        Disconnect
                    </button>
                </div>
            ) : (
                <div>
                    <button
                        onClick={connectWallet}
                        disabled={isLoading}
                        className={`mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition duration-300 ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <svg
                                    className="animate-spin h-5 w-5 text-white mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    ></path>
                                </svg>
                                Connecting...
                            </div>
                        ) : (
                            'Connect Wallet'
                        )}
                    </button>
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default WalletConnect;
