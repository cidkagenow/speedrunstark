import { deployContract, exportDeployments } from "./deploy-contract";

const deployScript = async (): Promise<void> => {
  const { address: exampleContractAddr } = await deployContract(
    null,
    "ExampleExternalContract"
  );
  await deployContract(
    { external_contract_address: exampleContractAddr },
    "Staker"
  );
};

deployScript()
  .then(() => {
    exportDeployments();
    console.log("All Setup Done");
  })
  .catch(console.error);
