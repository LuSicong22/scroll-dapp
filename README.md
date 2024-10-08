## Demo: [scroll-dapp-olcp.vercel.app](https://scroll-dapp-olcp.vercel.app)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Design decisions & features

### MetaMask Integration
This app uses MetaMask as the primary wallet provider. Users can connect, switch networks, and interact with the Ethereum blockchain through MetaMask. The app auto-prompts users to add and switch to the Scroll Layer 2 network if necessary.

### Network Switching & Custom Networks
To support Layer 2 scaling solutions like Scroll, the app prompts users to switch to the Scroll Layer 2 network. If they don't have it in their MetaMask, they will be asked to add the network, improving the user experience and reducing friction.

### Loading and Error Handling
- A loading spinner is shown while the wallet is being connected or the network is being switched.
- Clear error messages are displayed to inform the user of any issues that occur during wallet connection or network switching.

### State Management
The component uses React's `useState` to handle wallet address, provider, and error states. This ensures that the UI is always up-to-date with the user's connection status.

### Ethers.js v6
This app uses `ethers.js v6` for interacting with Ethereum. The library abstracts the complexity of blockchain interactions, allowing for a smooth integration with MetaMask and supporting features such as account signing and network switching.

### Wallet Disconnect Feature
The component provides a simple method for users to disconnect their wallet, which clears the wallet address and provider from the app's state, ensuring privacy.

### Security
No user-sensitive information is stored in local storage. All sensitive data is handled in React's local state, and the session is cleared upon disconnect.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
