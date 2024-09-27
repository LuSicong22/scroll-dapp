import React, { useState } from 'react';
import { ethers } from 'ethers';

interface Props {
    walletAddress: string | null;
}

const TransferForm: React.FC<Props> = ({ walletAddress }) => {
    const [recipient, setRecipient] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const sendTransaction = async () => {
        if (!walletAddress) {
            alert('Connect your wallet first');
            return;
        }

        if (!ethers.utils.isAddress(recipient)) {
            alert('Invalid recipient address');
            return;
        }

        if (!amount || isNaN(parseFloat(amount))) {
            alert('Invalid amount');
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            const tx = await signer.sendTransaction({
                to: recipient,
                value: ethers.utils.parseEther(amount),
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
            <div>Transfer Form:</div>
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
