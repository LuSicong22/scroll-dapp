import React, {useEffect} from 'react';
import {BrowserProvider, ethers} from 'ethers';

interface Props {
    walletAddress: string | null,
    provider: BrowserProvider | null,
    balance: string,
    setBalance: (value: (((prevState: string) => string) | string)) => void
}

const EthBalance: React.FC<Props> = ({walletAddress, provider, balance, setBalance}) => {

    useEffect(() => {
        const fetchBalance = async () => {
            if (walletAddress && provider) {
                try {
                    const balance = await provider.getBalance(walletAddress);
                    setBalance(parseFloat(ethers.formatEther(balance)).toFixed(8));  // Format balance to 2 decimal places
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
