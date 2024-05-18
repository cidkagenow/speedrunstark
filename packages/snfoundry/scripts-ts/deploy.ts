import { deployContract, deployer, provider } from "./deploy-contract";
import { RpcProvider, Account } from "starknet-dev";

const deployScript = async (): Promise<void> => {
  const your_token = await deployContract(
    {
      name: "Gold",
      symbol: "GLD",
      fixed_supply: 2_000_000_000_000_000_000_000n, //2000 * 10^18
      recipient: deployer.address,
    },
    "YourToken"
  );

  const ch2 = await deployContract(
    {
      token_address: your_token.address,
      owner: deployer.address,
    },
    "Vendor"
  );
};

deployScript()
  .then(() => {
    console.log("All Setup Done");
  })
  .catch(console.error);
