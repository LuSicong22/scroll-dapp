import React, { useEffect, useState } from 'react';

interface Transaction {
    recipient: string;
    amount: string;
    timestamp: string;
}

const TransactionHistory: React.FC = () => {
    const [history, setHistory] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch('/api/history');
                const data = await response.json();
                setHistory(data);
            } catch (error) {
                console.error('Failed to fetch transaction history:', error);
            }
        };

        fetchHistory();
    }, []);

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
