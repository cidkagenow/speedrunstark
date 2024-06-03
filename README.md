# 🚩 Challenge #1: 🥩 Decentralized Staking App

![readme-1](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/7e7be92753ffa1f18f50976e97fdb0052ca9414a/packages/nextjs/public/banner-decentralized-staking.svg)

🦸 A superpower of Smart contracts is allowing you, the builder, to create a simple set of rules that an adversarial group of players can use to work together. In this challenge, you create a decentralized application where users can coordinate a group funding effort. If the users cooperate, the money is collected in a second smart contract. If they defect, the worst that can happen is everyone gets their money back. The users only have to trust the code.

🏦 Build a `Staker.cairo` contract that collects _ETH_ from numerous addresses using a function `stake()` function and keeps track of balances. After some deadline if it has at least some threshold of ETH, it sends it to an `ExampleExternalContract` and triggers the `complete()` action sending the full balance. If not enough _ETH_ is collected, allows users to withdraw().

🎛 Building the frontend to display the information and UI is just as important as writing the contract. The goal is to deploy the contract and the app to allow anyone to stake using your app. Use a `Stake(address,uint256)` event to list all stakes.

🌟 The final deliverable is deploying a Dapp that lets users send ether to a contract and stake if the conditions are met, then `yarn vercel` your app to a public webserver.

> 💬 Submit this challenge, meet other builders working on this challenge or get help in the [Builders telegram chat](https://t.me/+wO3PtlRAreo4MDI9)!

---

## Checkpoint 0: 📦 Environment 📚

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

### Compatible versions

- scarb - v2.5.4
- cairo - v2.5.4
- starknet - v2.5.4
- snforge - v0.23.0 // starknet foundry
- sierra - v1.4.0
- rpc - v0.5.1

Make sure you have the compatible versions otherwise refer to [Scaffold-Stark Requirements](https://github.com/Quantum3-Labs/scaffold-stark-2?.tab=readme-ov-file#requirements)

Then download the challenge to your computer and install dependencies by running:

```sh
git clone https://github.com/Quantum3-Labs/speedrunstark.git --recurse-submodules decentralized-staking
cd decentralized-staking
git checkout decentralized-staking
yarn install
```

> in the same terminal, start your local network (a blockchain emulator in your computer):

2. Prepare your environment variables.

By defauly Scaffold-Stark 2 takes the first prefunded account from `starknet-devnet` as a deployer address, thus **you can skip this step!**. But if you want use the .env file anyway, you can fill the envs related to devnet with any other predeployed contract address and private key from starknet-devnet.

**Note:** In case you want to deploy on Sepolia, you need to fill the envs related to sepolia testnet with your own contract address and private key.

```bash
cp packages/snfoundry/.env.example packages/snfoundry/.env
```

3. Run a local network in the first terminal.

**Note:** You can skip this step if you want to use Sepolia Testnet.

```bash
yarn chain
```

> in a second terminal window, 🛰 deploy your contract (locally):

```sh
cd decentralized-staking
yarn deploy
```

> in a third terminal window, start your 📱 frontend:

```sh
cd decentralized-staking
yarn start
```

📱 Open http://localhost:3000 to see the app.

> 👩‍💻 Rerun yarn deploy whenever you want to deploy new contracts to the frontend. If you haven't made any contract changes, you can run yarn deploy --reset for a completely fresh deploy.

🔏 Now you are ready to edit your smart contract Staker.cairo in packages/sfoundry/contracts

---

## Checkpoint 1: 🥩 Staking 💵

You'll need to track individual balances using a LegacyMap:

```cairo
balances: LegacyMap<ContractAddress, u256>
```

And also track a constant threshold at 1 ether

```cairo
const THRESHOLD: u256 = 1000000000000000000;
```

> 👩‍💻 Write your `stake()` function and test it with the Debug Contracts tab in the frontend.

![debugContracts](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/decentralized-staking/packages/nextjs/public/debug-stake.png)

### 🥅 Goals

- [ ] Do you see the balance of the Staker contract go up when you stake()?
- [ ] Is your balance correctly tracked?
- [ ] Do you see the events in the Stake Events tab?

  ![allStakings](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/87dae08f476eadb05ea377247885aad16713599f/packages/nextjs/public/events.png)

---

## Checkpoint 2: 🔬 State Machine / Timing ⏱

### State Machine

> ⚙️ Think of your smart contract like a state machine. First, there is a _stake_ period. Then, if you have gathered the threshold worth of ETH, there is a _success_ state. Or, we go into a _withdraw_ state to let users withdraw their funds.

Set a deadline of `block.timestamp + 30 seconds` in the constructor

```cairo
self.deadline.write(get_block_timestamp() + 30);
```

👨‍🏫 Smart contracts can't execute automatically, you always need to have a transaction execute to change state. Because of this, you will need to have an `execute()` function that anyone can call, just once, after the deadline has expired.

> 👩‍💻 Write your `execute()` function and test it with the Debug Contracts tab

> Check the `ExampleExternalContract.cairo` for the bool you can use to test if it has been completed or not. But do not edit the `ExampleExternalContract.cairo` as it can slow the auto grading.

If the `self.balances.read(sender)` of the contract is over the threshold by the deadline, you will want to call: `self._complete_transfer(staked_amount);`

If the balance is less than the threshold, you want to set a openForWithdraw bool to true which will allow users to withdraw() their funds.

### Timing

You'll have 30 seconds after deploying until the deadline is reached, you can adjust this in the contract.

> 👩‍💻 Create a time_left function including u64 that returns how much time is left.

⚠️ Be careful! If `get_block_timestamp() >= deadline` you want to return 0;

![stakerUI](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/87dae08f476eadb05ea377247885aad16713599f/packages/nextjs/public/stake.png)

> 👩‍💻 You can call `yarn deploy` again any time you want a fresh contract.
> You may need it when you want to reload the "Time Left" of your tests.

Your Staker UI tab should be almost done and working at this point.

---

### 🥅 Goals

- [ ] Can you see timeLeft counting down in the Staker UI tab when you trigger a transaction with the faucet button?
- [ ] If enough ETH is staked by the deadline, does your `execute()` function correctly call `complete()` and stake the ETH?
- [ ] If the threshold isn't met by the deadline, are you able to withdraw() your funds?

---

## Checkpoint 3: 💵 UX 🙎

### ⚔️ Side Quests

- [ ] Can `execute()` get called more than once, and is that okay?
- [ ] Can you stake and withdraw freely after the deadline, and is that okay?
- [ ] What are other implications of anyone being able to withdraw for someone?

---

### 🐸 It's a trap!

- [ ] Make sure funds can't get trapped in the contract! _Try sending funds after you have executed! What happens?_
- [ ] Try to create a modifier called `notCompleted`. It will check that `ExampleExternalContract` is not completed yet. Use it to protect your `execute` and `withdraw` functions.

### ⚠️ Test it!

- Now is a good time to run yarn test to run the automated testing function. It will test that you hit the core checkpoints. You are looking for all green checkmarks and passing tests!

---

## Checkpoint 4: 💾 Deploy your contract! 🛰

📡 Edit the `defaultNetwork` to your choice of public Starknet networks in `packages/nextjs/scaffold.config.ts`

![network](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/simple-nft-example/packages/nextjs/public/ch0-scaffold-config.png)

🔐 You will need to generate a _deployer address_ using Argent or Braavos, get your private key and put in `packages/snfoundry/.env`

⛽️ You will need to send ETH to your deployer address with your wallet, or get it from a public faucet of your chosen network.

> 📝 If you plan on submitting this challenge, be sure to set your deadline to at least block.timestamp + 72 hours

🚀 Run yarn deploy --network [network] to deploy your smart contract to a public network (mainnet or sepolia).

![allStakings-blockFrom](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/87dae08f476eadb05ea377247885aad16713599f/packages/nextjs/public/events.png)

> 💬 Hint: For faster loading of your "Stake Events" page, consider updating the fromBlock passed to useScaffoldEventHistory in [packages/nextjs/app/stakings/page.tsx](https://github.com/scaffold-eth/se-2-challenges/blob/challenge-1-decentralized-staking/packages/nextjs/app/stakings/page.tsx) to blocknumber - 10 at which your contract was deployed. Example: fromBlock: 3750241n (where n represents its a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)).

---

## Checkpoint 5: 🚢 Ship your frontend! 🚁

✏️ Edit your frontend config in packages/nextjs/scaffold.config.ts to change the targetNetwork to chains.sepolia or any other public network.

💻 View your frontend at http://localhost:3000/stakerUI and verify you see the correct network.

📡 When you are ready to ship the frontend app...

📦 Run yarn vercel to package up your frontend and deploy.

> Follow the steps to deploy to Vercel. Once you log in (email, github, etc), the default options should work. It'll give you a public URL.

> If you want to redeploy to the same production URL you can run `yarn vercel --prod`. If you omit the `--prod` flag it will deploy it to a preview/test URL.

> 🦊 Since we have deployed to a public testnet, you will now need to connect using a wallet you own or use a burner wallet. By default 🔥 burner wallets are only available on devnet. You can enable them on every chain by setting `onlyLocalBurnerWallet: false` in your frontend config (`scaffold.config.ts` in `packages/nextjs/`)

#### Configuration of Third-Party Services for Production-Grade Apps.

By default, 🏗 Scaffold-Stark provides predefined API keys for services such as Infura. This allows you to begin developing and testing your applications more easily, avoiding the need to register for these services.

For production-grade applications, it's recommended to obtain your own API keys (to prevent rate limiting issues). You can configure these at:

🔷 `RPC_URL_SEPOLIA` variable in `packages/snfoundry/.env` and `packages/nextjs/.env.local`. You can create API keys from the [Alchemy dashboard](https://dashboard.alchemy.com/).

> 💬 Hint: It's recommended to store env's for nextjs in Vercel/system env config for live apps and use .env.local for local testing.

---

> 🏃 Head to your next challenge [here](https://github.com/Quantum3-Labs/speedrunstark/tree/token-vendor).

> 💬 Problems, questions, comments on the stack? Post them to the [🏗 scaffold-stark developers chat](https://t.me/+wO3PtlRAreo4MDI9)
