import React, { useEffect, useState } from 'react';

interface Transaction {
    recipient: string;
    amount: string;
    timestamp: string;
}

interface Props {
    refresh: boolean;  // Prop to trigger history refresh
}

const TransactionHistory: React.FC<Props> = ({ refresh }) => {
    const [history, setHistory] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);  // Loading state
    const [error, setError] = useState<string | null>(null);  // Error state

    // Function to fetch transaction history from mock API
    const fetchHistory = async () => {
        setIsLoading(true);
        setError(null);  // Reset error before fetching
        try {
            const response = await fetch('/api/history');
            const data = await response.json();
            setHistory(data);
        } catch (error) {
            console.error('Failed to fetch transaction history:', error);
            setError('Failed to fetch transaction history. Please try again.');
        } finally {
            setIsLoading(false);  // Stop loading spinner
        }
    };

    useEffect(() => {
        fetchHistory();  // Fetch transaction history on component mount
    }, []);

    // Refresh transaction history when the refresh prop changes
    useEffect(() => {
        if (refresh) {
            fetchHistory();
        }
    }, [refresh]);

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h2>

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
                    <p className="text-gray-600">Loading transaction history...</p>
                </div>
            ) : error ? (
                <div className="text-center text-red-500">
                    <p>{error}</p>
                </div>
            ) : history.length > 0 ? (
                <ul className="space-y-4">
                    {history.map((tx, index) => (
                        <li
                            key={index}
                            className="border-b pb-2 border-gray-200 text-gray-700"
                        >
                            <span className="font-bold text-indigo-600">{tx.amount} ETH</span> sent to{' '}
                            <span className="text-gray-800">{tx.recipient}</span> on{' '}
                            <span className="text-gray-600">{new Date(tx.timestamp).toLocaleString()}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No transactions found</p>
            )}
        </div>
    );
};

export default TransactionHistory;
