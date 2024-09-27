import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

interface Props {
    walletAddress: string | null;
}

const EthBalance: React.FC<Props> = ({ walletAddress }) => {
    const [balance, setBalance] = useState<string>('0');

    useEffect(() => {
        const fetchBalance = async () => {
            if (walletAddress) {
                const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID');
                const balance = await provider.getBalance(walletAddress);
                setBalance(ethers.utils.formatEther(balance));
            }
        };

        fetchBalance();
    }, [walletAddress]);

    return (
        <div>
            <p>Your ETH Balance: {balance} ETH</p>
        </div>
    );
};

export default EthBalance;
