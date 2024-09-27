// global.d.ts
interface Window {
    ethereum?: {
        isMetaMask?: boolean;
        request: (args: { method: string; params: { chainId: string }[] }) => Promise<never>;
    };
}
