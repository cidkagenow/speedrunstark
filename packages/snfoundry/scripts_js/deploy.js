const { deployer, deployContract } = require("./deploy_contract");
const deployScript = async () => {
  const your_token = await deployContract(
    {
      name: "Gold",
      symbol: "GLD",
      fixed_supply: 2_000_000_000_000_000_000_000n, //2000 * 10^18
      recipient:
        "0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691",
    },
    "YourToken"
    );
  
  const ch2 = await deployContract({
    token_address: your_token.address,
    eth_contract_address: "0x49D36570D4E46F48E99674BD3FCC84644DDD6B96F7C741B1562B82F9E004DC7",
    owner: "0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691"
  }
    , "Challenge2");
};

deployScript()
  .then(() => {
    console.log("All Setup Done");
  })
  .catch(console.error);
