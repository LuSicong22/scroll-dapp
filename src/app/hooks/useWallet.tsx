import { useState } from 'react';
import { ethers } from 'ethers';

declare let window: any;

export const useWallet = () => {
    const [address, setAddress] = useState<string>('');
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
                await web3Provider.send('eth_requestAccounts', []);
                const signer = web3Provider.getSigner();
                const userAddress = await signer.getAddress();
                setAddress(userAddress);
                setProvider(web3Provider);
            } catch (error) {
                console.error('Connection Error:', error);
            }
        } else {
            alert('MetaMask is not installed');
        }
    };

    const disconnectWallet = () => {
        setAddress('');
        setProvider(null);
    };

    return { address, provider, connectWallet, disconnectWallet };
};
