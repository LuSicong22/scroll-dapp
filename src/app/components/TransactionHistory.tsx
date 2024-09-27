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

    // Function to fetch transaction history from mock API
    const fetchHistory = async () => {
        try {
            const response = await fetch('/api/history');
            const data = await response.json();
            setHistory(data);
        } catch (error) {
            console.error('Failed to fetch transaction history:', error);
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
        <div>
            <h2>Transaction History</h2>
            {history.length > 0 ? (
                <ul>
                    {history.map((tx, index) => (
                        <li key={index}>
                            {tx.amount} ETH sent to {tx.recipient} on {new Date(tx.timestamp).toLocaleString()}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transactions found</p>
            )}
        </div>
    );
};

export default TransactionHistory;
