import React, { useState } from 'react';
import { BrowserProvider, parseEther, isAddress } from 'ethers';  // ethers.js v6

interface Props {
    walletAddress: string | null;
    provider: BrowserProvider | null;
    refreshHistory: () => void;
    balance: string;
}

const TransferForm: React.FC<Props> = ({ walletAddress, provider, refreshHistory, balance }) => {
    const [recipient, setRecipient] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);  // Loading state

    // Function to validate and send transaction
    const sendTransaction = async () => {
        setMessage('');  // Reset any previous messages

        // Validate if wallet is connected
        if (!walletAddress || !provider) {
            setMessage('Please connect your wallet first.');
            return;
        }

        // Validate recipient address
        if (!isAddress(recipient)) {
            setMessage('Invalid recipient address.');
            return;
        }

        // Validate amount (ensure it's a valid number and not greater than balance)
        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            setMessage('Invalid amount.');
            return;
        }

        if (parseFloat(amount) > parseFloat(balance)) {
            setMessage('Insufficient balance.');
            return;
        }

        // Set loading state
        setIsLoading(true);

        try {
            // Get signer and send transaction
            const signer = await provider.getSigner();
            const tx = await signer.sendTransaction({
                to: recipient,
                value: parseEther(amount),  // Convert ETH to Wei
            });

            setMessage(`Transaction successful! Hash: ${tx.hash}`);

            // Prepare transaction data for the mock API
            const transactionData = {
                recipient,
                amount,
                timestamp: new Date().toISOString(),  // Get the current timestamp
            };

            // Save transaction to the mock API (POST request)
            await fetch('/api/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transactionData),
            });

            // Refresh history after successful transaction
            refreshHistory();

        } catch (error) {
            console.error('Transaction failed:', error);
            setMessage('Transaction failed.');
        } finally {
            // Stop loading spinner
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-md space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Transfer ETH</h2>
            <p className="text-sm text-gray-600">Available Balance: {balance} ETH</p>

            <div className="space-y-2">
                <input
                    type="text"
                    placeholder="Recipient Address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                    type="text"
                    placeholder="Amount in ETH"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            </div>

            <button
                onClick={sendTransaction}
                disabled={isLoading}
                className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <svg
                            className="animate-spin h-5 w-5 text-white"
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
                        <span className="ml-2">Processing...</span>
                    </div>
                ) : (
                    'Send ETH'
                )}
            </button>

            {/* Display success/error message */}
            {message && <p className="text-center text-red-500 mt-2">{message}</p>}
        </div>
    );
};

export default TransferForm;
