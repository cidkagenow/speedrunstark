# 🚩 Challenge #0: 🎟 Simple NFT Example

![readme-0](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/4fa48a3fb7eb1319c3424b9b835fc6acdb1a9f00/packages/nextjs/public/hero.png)

🎫 Create a simple NFT to learn basics of 🏗 Scaffold-Stark. You'll use [Scarb](https://docs.swmansion.com/scarb/) to compile and [Starknet.js](https://www.starknetjs.com/) to deploy smart contracts. Then, you'll use a template React app full of important Starknet components and hooks. Finally, you'll deploy an NFT to a public network to share with friends! 🚀

🌟 The final deliverable is an app that lets users purchase and transfer NFTs. Deploy your contracts to a testnet, then build and upload your app to a public web server. Submit the url on [Speedrunstark.com](https://speedrunstark.com/)!

💬 Meet other builders working on this challenge and get help in the [Challenge 0 Telegram]()!

## Checkpoint 0: 📦 Environment 📚

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

Then download the challenge to your computer and install dependencies by running:

```sh
git clone https://github.com/Quantum3-Labs/speedrunstark.git --recurse-submodules challenge-0-simple-nft
cd challenge-0-simple-nft
git checkout simple-nft-example

yarn install
```

> in the same terminal, start your local network (a blockchain emulator in your computer):

```sh
yarn chain
```

> in a second terminal window, 🛰 deploy your contract (locally):

```sh
cd challenge-0-simple-nft
yarn deploy
```

> in a third terminal window, start your 📱 frontend:

```sh
cd challenge-0-simple-nft
yarn start
```

📱 Open http://localhost:3000 to see the app.

---

## Checkpoint 1: ⛽️ Gas & Wallets 👛

> 🔥 We'll use burner wallets on localhost.

> 👛 Explore how burner wallets work in 🏗 Scaffold-Stark. You will notice the `Connect Wallet` button on the top right corner. After click it, you can choose the `Burner Wallet` option. You will get a default prefounded account.
---

## Checkpoint 2: 🖨 Minting

> ✏️ Mint some NFTs! Click the **MINT NFT** button in the `My NFTs` tab.

![image](./packages/nextjs/public/ch0-mynft.png)

👀 You should see your NFTs start to show up!

![image](./packages/nextjs/public/ch0-nfts-images.png)

👛 Open an window Browser and navigate to http://localhost:3000

🎟 Transfer an NFT from one address to another using the UI:

![image](./packages/nextjs/public/ch0-nfts-images-transfer.png)

🕵🏻‍♂️ Inspect the `Debug Contracts` tab to figure out what address is the owner of YourCollectible?

🔏 You can also check out your smart contract `Challenge0.cairo` in `packages/snfoundry/contracts`.

💼 Take a quick look at your deploy script `deploy.js` in `packages/snfoundry/script_js`.

📝 If you want to edit the frontend, navigate to `packages/nextjs/app` and open the specific page you want to modify. For instance: `/myNFTs/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.

---

## Checkpoint 3: 💾 Deploy your contract! 🛰

🛰 Ready to deploy to a public testnet?!?

> Change the defaultNetwork in `packages/nextjs/scaffold.config.ts` to `sepolia`.

> Prepare your environment variables. 

```shell
cp packages/snfoundry/.env.example packages/snfoundry/.env
```

> You need to fill the envs related to Sepolia testnet with your own contract address and private key.

⛽️ You will need to send ETH or STRK to your deployer Contract Addres with your wallet, or get it from a public faucet of your chosen network.

> Some popular faucets are [https://starknet-faucet.vercel.app/](https://starknet-faucet.vercel.app/) and [https://blastapi.io/faucets/starknet-sepolia-eth](https://blastapi.io/faucets/starknet-sepolia-eth)

🚀 Deploy your NFT smart contract with `yarn deploy`.

> you input `yarn deploy --network sepolia`.

---

## Checkpoint 4: 🚢 Ship your frontend! 🚁

> ✏️ Edit your frontend config in `packages/nextjs/scaffold.config.ts` to change the `targetNetwork` to `chains.sepolia` :

![chall-0-scaffold-config](./packages/nextjs/public/ch0-scaffold-config.png)

> 🦊 Since we have deployed to a public testnet, you will now need to connect using a wallet you own(Argent X or Braavos).

![connect-wallet](./packages/nextjs/public/ch0-walletconnect.png)

> You should see the correct network in the frontend (http://localhost:3000):

![image](./packages/nextjs/public/ch0-balance.png)

> 💬 Hint: For faster loading of your transfer page, consider updating the `fromBlock` passed to `useScaffoldEventHistory` in [`packages/nextjs/app/transfers/page.tsx`](https://github.com/scaffold-eth/se-2-challenges/blob/challenge-0-simple-nft/packages/nextjs/app/transfers/page.tsx#L12) to `blocknumber - 10` at which your contract was deployed. Example: `fromBlock: 3750241n` (where `n` represents its a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)). To find this blocknumber, search your contract's address on Etherscan and find the `Contract Creation` transaction line.

🚀 Deploy your NextJS App

```shell
yarn vercel
```

> Follow the steps to deploy to Vercel. Once you log in (email, github, etc), the default options should work. It'll give you a public URL.

> If you want to redeploy to the same production URL you can run `yarn vercel --prod`. If you omit the `--prod` flag it will deploy it to a preview/test URL.

#### Configuration of Third-Party Services for Production-Grade Apps.

By default, 🏗 Scaffold-Stark provides predefined API keys for popular services such as Alchemy and Etherscan. This allows you to begin developing and testing your applications more easily, avoiding the need to register for these services.  
This is great to complete your **SpeedRunEthereum**.

For production-grade applications, it's recommended to obtain your own API keys (to prevent rate limiting issues). You can configure these at:

- 🔷`RPC_URL_SEPOLIA` variable in `packages/snfoundry/.env` and `packages/nextjs/.env.local`. You can create API keys from the [Alchemy dashboard](https://dashboard.alchemy.com/).


> 💬 Hint: It's recommended to store env's for nextjs in Vercel/system env config for live apps and use .env.local for local testing.


---

> 🏃 Head to your next challenge [here](https://github.com/Quantum3-Labs/speedrunstark/tree/decentralized-staking).

> 💭 Problems, questions, comments on the stack? Post them to the [🏗 Scaffold-Stark developers chat]()
