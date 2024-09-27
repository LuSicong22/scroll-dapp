// src/pages/api/history.ts

import { NextApiRequest, NextApiResponse } from 'next';

// A mock database to store the transaction history in memory (this is just for the demo)
const transactionHistory: Array<{
    recipient: string;
    amount: string;
    timestamp: string;
}> = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Add a new transaction to the history
        const { recipient, amount, timestamp } = req.body;
        transactionHistory.push({ recipient, amount, timestamp });
        return res.status(201).json({ message: 'Transaction recorded' });
    } else if (req.method === 'GET') {
        // Return the transaction history
        return res.status(200).json(transactionHistory);
    } else {
        // Handle unsupported methods
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
