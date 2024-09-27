import React, { useEffect, useState } from 'react';
import { BrowserProvider,ethers } from 'ethers';

interface Props {
    walletAddress: string | null;
    provider: BrowserProvider | null;
}

const EthBalance: React.FC<Props> = ({ walletAddress, provider }) => {
    const [balance, setBalance] = useState<string>('0');

    useEffect(() => {
        const fetchBalance = async () => {
            if (walletAddress && provider) {
                try {
                    const balance = await provider.getBalance(walletAddress);
                    setBalance(parseFloat(ethers.formatEther(balance)).toFixed(3));  // Format balance to 2 decimal places
                } catch (error) {
                    console.error('Error fetching balance:', error);
                }
            }
        };

        fetchBalance();
    }, [walletAddress, provider]);

    return (
        <div>
            <p>Your ETH Balance on Scroll L2: {balance} ETH</p>
        </div>
    );
};

export default EthBalance;
