"use client";

import { useAccount } from "@starknet-react/core";
import { useDeployedContractInfo } from "~~/hooks/scaffold-stark";
import { useTargetNetwork } from "~~/hooks/scaffold-stark/useTargetNetwork";
import { useScaffoldContractRead } from "~~/hooks/scaffold-stark/useScaffoldContractRead";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-stark/useScaffoldContractWrite";
import { ETHToPrice } from "~~/components/stake/ETHToPrice";
import { Address } from "~~/components/scaffold-stark";

export const StakeContractInteraction = ({ address }: { address?: string }) => {
  const { address: connectedAddress } = useAccount();
  const { data: StakerContract } = useDeployedContractInfo("Challenge1");

  const { targetNetwork } = useTargetNetwork();

  // Contract Read Actions
  const { data: threshold } = useScaffoldContractRead({
    contractName: "Challenge1",
    functionName: "threshold",
    watch: true,
  });
  const { data: timeLeft } = useScaffoldContractRead({
    contractName: "Challenge1",
    functionName: "time_left",
    watch: true,
  });

  const { data: isStakingCompleted } = useScaffoldContractRead({
    contractName: "Challenge1",
    functionName: "completed",
    watch: true,
  });

  // Contract Write Actions
  // const { writeAsync: stakeETH } = useScaffoldContractWrite({
  //     contractName: "Challenge1",
  //     functionName: "stake",
  //     args:BigInt(0),
  // });
  const { writeAsync: execute } = useScaffoldContractWrite({
    contractName: "Challenge1",
    functionName: "execute",
  });
  const { writeAsync: withdrawETH } = useScaffoldContractWrite({
    contractName: "Challenge1",
    functionName: "withdraw",
  });

  return (
    <div className="flex items-center flex-col flex-grow w-full px-4 gap-12">
      {isStakingCompleted && (
        <div className="flex flex-col items-center gap-2 bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-6 mt-12 w-full max-w-lg">
          <p className="block m-0 font-semibold">
            {" "}
            🎉 &nbsp; Staking App triggered `ExampleExternalContract` &nbsp; 🎉{" "}
          </p>
          <div className="flex items-center">
            <ETHToPrice value={"0"} className="text-[1rem]" />
            <p className="block m-0 text-lg -ml-1">staked !!</p>
          </div>
        </div>
      )}
      <div
        className={`flex flex-col items-center space-y-8 bg-base-100 shadow-lg shadow-secondary border-8 border-primary rounded-xl p-6 w-full max-w-lg ${
          !isStakingCompleted ? "mt-24" : ""
        }`}
      >
        <div className="flex flex-col w-full items-center">
          <p className="block text-2xl mt-0 mb-2 font-semibold">
            Staker Contract
          </p>
          <Address address={address} size="xl" />
        </div>
        <div className="flex items-start justify-around w-full">
          <div className="flex flex-col items-center justify-center w-1/2">
            <p className="block text-xl mt-0 mb-1 font-semibold">Time Left</p>
            <p className="m-0 p-0">
              {timeLeft ? `${Number(timeLeft) * 1000}` : 0}
            </p>
          </div>
          <div className="flex flex-col items-center w-1/2">
            <p className="block text-xl mt-0 mb-1 font-semibold">You Staked</p>
            <span>
              {0} {targetNetwork.nativeCurrency.symbol}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center shrink-0 w-full">
          <p className="block text-xl mt-0 mb-1 font-semibold">Total Staked</p>
          <div className="flex space-x-2">
            {<ETHToPrice value={"0"} />}
            <span>/</span>
            {<ETHToPrice value={"0"} />}
          </div>
        </div>
        <div className="flex flex-col space-y-5">
          <div className="flex space-x-7">
            <button className="btn btn-primary uppercase text-base-100">
              Execute!
            </button>
            <button className="btn btn-primary uppercase text-base-100">
              Withdraw
            </button>
          </div>
          <button className="btn btn-primary uppercase text-base-100">
            🥩 Stake 0.5 ether!
          </button>
        </div>
      </div>
    </div>
  );
};
