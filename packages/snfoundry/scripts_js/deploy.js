const { deployer, deployContract } = require("./deploy_contract");
const deployScript = async () => {

  const {address: exampleContractAddr }= await deployContract(null, "ExampleExternalContract");
  await deployContract({ external_contract_address: exampleContractAddr }
    , "Staker");

};

deployScript()
  .then(() => {
    console.log("All Setup Done");
  })
  .catch(console.error);