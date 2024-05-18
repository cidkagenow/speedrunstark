import { deployContract, resetDeploymentState } from "./deploy-contract";

const deployScript = async (): Promise<void> => {
  resetDeploymentState();

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
    console.log("All Setup Done");
  })
  .catch(console.error);
