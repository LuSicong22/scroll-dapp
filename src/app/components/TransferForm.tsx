import React, { useState } from 'react';
import { BrowserProvider, parseEther, isAddress } from 'ethers';  // ethers.js v6

interface Props {
    walletAddress: string | null;
    provider: BrowserProvider | null;  // Accept provider as a prop
}

const TransferForm: React.FC<Props> = ({ walletAddress, provider }) => {
    const [recipient, setRecipient] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const sendTransaction = async () => {
        if (!walletAddress || !provider) {
            alert('Connect your wallet first');
            return;
        }

        if (!isAddress(recipient)) {
            alert('Invalid recipient address');
            return;
        }

        if (!amount || isNaN(parseFloat(amount))) {
            alert('Invalid amount');
            return;
        }

        try {
            const signer = await provider.getSigner();
            const tx = await signer.sendTransaction({
                to: recipient,
                value: parseEther(amount),  // Use ethers v6 to parse amount to Wei
            });

            setMessage(`Transaction successful! Hash: ${tx.hash}`);
            // Here you can make a POST request to save transaction history using the mock API
        } catch (error) {
            console.error('Transaction failed:', error);
            setMessage('Transaction failed');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
            />
            <input
                type="text"
                placeholder="Amount in ETH"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={sendTransaction}>Send ETH</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default TransferForm;
