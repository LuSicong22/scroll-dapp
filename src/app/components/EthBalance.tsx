import React, { useEffect, useState } from 'react';
import { BrowserProvider, ethers } from 'ethers';

interface Props {
    walletAddress: string | null;
    provider: BrowserProvider | null;
    balance: string;
    setBalance: (value: (((prevState: string) => string) | string)) => void;
}

const EthBalance: React.FC<Props> = ({ walletAddress, provider, balance, setBalance }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);  // State to track errors

    useEffect(() => {
        const fetchBalance = async () => {
            if (walletAddress && provider) {
                setIsLoading(true);
                setError(null);  // Reset error before fetching balance
                try {
                    const balanceInWei = await provider.getBalance(walletAddress);
                    const formattedBalance = parseFloat(ethers.formatEther(balanceInWei)).toFixed(8);  // Format to 8 decimals
                    setBalance(formattedBalance);  // Update balance
                } catch (error) {
                    console.error('Error fetching balance:', error);
                    setError('Failed to fetch balance. Please try again.');
                } finally {
                    setIsLoading(false);  // Stop loading state
                }
            }
        };

        fetchBalance();
    }, [walletAddress, provider, setBalance]);

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            {isLoading ? (
                <div className="text-center">
                    <svg
                        className="animate-spin h-8 w-8 text-gray-500 mx-auto mb-2"
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
                    <p className="text-gray-600">Fetching balance...</p>
                </div>
            ) : error ? (
                <div className="text-center text-red-500">
                    <p>{error}</p>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-xl font-semibold text-gray-800">Your ETH Balance on Scroll L2</p>
                    <p className="text-2xl font-bold text-indigo-600">{balance} ETH</p>
                </div>
            )}
        </div>
    );
};

export default EthBalance;
