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
                const provider = new ethers.InfuraProvider("sepolia","6d86a81a991b42ecb8c6b4fce02ee43e");
                const balance = await provider.getBalance(walletAddress);
                setBalance(ethers.formatEther(balance));
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
