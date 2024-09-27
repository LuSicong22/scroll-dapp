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
            const response = await fetch('/api/history');
            const data = await response.json();
            setHistory(data);
        };

        fetchHistory();
    }, []);

    return (
        <div>
            <h2>Transaction History</h2>
            <ul>
                {history.map((tx, index) => (
                    <li key={index}>
                        {tx.amount} ETH sent to {tx.recipient} at {tx.timestamp}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionHistory;
