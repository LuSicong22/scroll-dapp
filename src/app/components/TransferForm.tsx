import React, {useState} from 'react';
import {BrowserProvider, parseEther, isAddress} from 'ethers';  // ethers.js v6

interface Props {
    walletAddress: string | null,
    provider: BrowserProvider | null,
    refreshHistory: () => void,
    balance: string
}

const TransferForm: React.FC<Props> = ({walletAddress, provider, refreshHistory, balance}) => {
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

        if (!amount || isNaN(parseFloat(amount)) || amount > balance) {
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

            // Save transaction to mock API
            const transactionData = {
                recipient,
                amount,
                timestamp: new Date().toISOString(),  // Get the current timestamp
            };

            // Send transaction details to the mock API (POST request)
            await fetch('/api/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transactionData),
            });

            // Trigger history refresh after successful transaction
            refreshHistory();

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
