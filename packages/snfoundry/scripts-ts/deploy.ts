import {
  deployContract,
  deployer,
  resetDeploymentState,
} from "./deploy-contract";

const deployScript = async (): Promise<void> => {
  resetDeploymentState();
  const { address: diceGameAddr } = await deployContract(null, "DiceGame");
  await deployContract(
    {
      dice_game_address: diceGameAddr,
      owner: deployer.address,
    },
    "RiggedRoll"
  );
};

deployScript()
  .then(() => {
    console.log("All Setup Done");
  })
  .catch(console.error);
