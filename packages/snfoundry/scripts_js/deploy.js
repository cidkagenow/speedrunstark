const { deployer, deployContract, provider } = require("./deploy_contract");
const { RpcProvider, Account } = require("starknet-dev");

const deployScript = async () => {

  const your_token = await deployContract(
    {
      name: "Gold",
      symbol: "GLD",
      fixed_supply: 2_000_000_000_000_000_000_000n, //2000 * 10^18
      recipient:
        deployer.address,
    },
    "YourToken"
    );
  
  const ch2 = await deployContract({
    token_address: your_token.address,
    eth_contract_address: "0x49D36570D4E46F48E99674BD3FCC84644DDD6B96F7C741B1562B82F9E004DC7",
    owner: deployer.address,
  }
    , "Vendor");
  
  const provider_v6 = new RpcProvider({
    nodeUrl: provider.nodeUrl,
  });
  const deployer_v6 = new Account(provider_v6, deployer.address, deployer.signer.pk, 1);

  
 //transfer 1000 GLD tokens to VendorContract(ch2)
  await deployer_v6.execute(
    [
      {
        contractAddress: your_token.address,
        calldata: [
          ch2.address,
          {
            low:  1_000_000_000_000_000_000_000n, //1000 * 10^18
            high: 0,
          }
        ],
        entrypoint: "transfer",
      }
    ],
    {
      maxFee: 1e18
    }
  );
};

deployScript()
  .then(() => {
    console.log("All Setup Done");
  })
  .catch(console.error);