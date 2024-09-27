import { NextApiRequest, NextApiResponse } from 'next';

let transactionHistory: Array<{ recipient: string; amount: string; timestamp: string }> = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { recipient, amount } = req.body;
        const timestamp = new Date().toISOString();
        transactionHistory.push({ recipient, amount, timestamp });
        res.status(200).json({ message: 'Transaction recorded' });
    } else if (req.method === 'GET') {
        res.status(200).json(transactionHistory);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
