"use client";

import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import { useAccount, useBalance } from "@starknet-react/core";
import { Roll, RollEvents } from "~~/components/RollEvents";
import { Winner, WinnerEvents } from "~~/components/WinnerEvents";
import { useScaffoldContract } from "~~/hooks/scaffold-stark/useScaffoldContract";
import { useScaffoldContractRead } from "~~/hooks/scaffold-stark/useScaffoldContractRead";
import { Amount } from "~~/components/diceComponents/Amount";
import { formatEther, parseEther } from "ethers";
import {
  createContractCall,
  useScaffoldMultiContractWrite,
} from "~~/hooks/scaffold-stark/useScaffoldMultiContractWrite";
import { Address } from "~~/components/scaffold-stark";

const ROLL_ETH_VALUE = "0.002";
const MAX_TABLE_ROWS = 10;

const DiceGame: NextPage = () => {
  const [rolls, setRolls] = useState<Roll[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);

  const [rolled, setRolled] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  const { data: riggedRollContract } = useScaffoldContract({
    contractName: "RiggedRoll",
  });
  const { data: riggedRollBalance } = useBalance({
    address: riggedRollContract?.address,
    watch: true,
  });
  const { data: accountDice } = useScaffoldContract({
    contractName: "DiceGame",
  });

  const { data: prize } = useScaffoldContractRead({
    contractName: "DiceGame",
    functionName: "prize",
  });

  const { data: lastDiceValue } = useScaffoldContractRead({
    contractName: "DiceGame",
    functionName: "last_dice_value",
  });
  // const { data: rollsHistoryData, isLoading: rollsHistoryLoading } = useScaffoldEventHistory({
  //   contractName: "DiceGame",
  //   eventName: "Roll",
  //   fromBlock: 0n,
  // });

  // useEffect(() => {
  //   if (!rolls.length && !!rollsHistoryData?.length && !rollsHistoryLoading) {
  //     setRolls(
  //       (
  //         rollsHistoryData?.map(({ args }) => ({
  //           address: args.player as string,
  //           amount: Number(args.amount),
  //           roll: (args.roll as bigint).toString(16).toUpperCase(),
  //         })) || []
  //       ).slice(0, MAX_TABLE_ROWS),
  //     );
  //   }
  // }, [rolls, rollsHistoryData, rollsHistoryLoading]);

  // useScaffoldEventSubscriber({
  //   contractName: "DiceGame",
  //   eventName: "Roll",
  //   listener: logs => {
  //     logs.map(log => {
  //       const { player, amount, roll } = log.args;

  //       if (player && amount && roll !== undefined) {
  //         setIsRolling(false);
  //         setRolls(rolls =>
  //           [{ address: player, amount: Number(amount), roll: roll.toString(16).toUpperCase() }, ...rolls].slice(
  //             0,
  //             MAX_TABLE_ROWS,
  //           ),
  //         );
  //       }
  //     });
  //   },
  // });

  // const { data: winnerHistoryData, isLoading: winnerHistoryLoading } = useScaffoldEventHistory({
  //   contractName: "DiceGame",
  //   eventName: "Winner",
  //   fromBlock: 0n,
  // });

  // useEffect(() => {
  //   if (!winners.length && !!winnerHistoryData?.length && !winnerHistoryLoading) {
  //     setWinners(
  //       (
  //         winnerHistoryData?.map(({ args }) => ({
  //           address: args.winner as string,
  //           amount: args.amount as bigint,
  //         })) || []
  //       ).slice(0, MAX_TABLE_ROWS),
  //     );
  //   }
  // }, [winnerHistoryData, winnerHistoryLoading, winners.length]);

  // useScaffoldEventSubscriber({
  //   contractName: "DiceGame",
  //   eventName: "Winner",
  //   listener: logs => {
  //     logs.map(log => {
  //       const { winner, amount } = log.args;

  //       if (winner && amount) {
  //         setIsRolling(false);
  //         setWinners(winners => [{ address: winner, amount }, ...winners].slice(0, MAX_TABLE_ROWS));
  //       }
  //     });
  //   },
  // });

  const { writeAsync: multiContractWriteDice } = useScaffoldMultiContractWrite({
    calls: [
      createContractCall("Eth", "approve", [
        accountDice?.address,
        parseEther(ROLL_ETH_VALUE),
      ]),
      createContractCall("DiceGame", "roll_dice", [parseEther(ROLL_ETH_VALUE)]),
    ],
  });

  const { writeAsync: multiContractWriteRigged } =
    useScaffoldMultiContractWrite({
      calls: [
        createContractCall("Eth", "approve", [
          riggedRollContract?.address,
          BigInt(1_000_000n),
        ]),
        createContractCall("RiggedRoll", "rigged_roll", [
          parseEther(ROLL_ETH_VALUE),
        ]),
      ],
    });

  const handleDice = async () => {
    try {
      const results = await multiContractWriteDice();
      setIsRolling(false);
      setRolled(false);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleRigged = async () => {
    try {
      const results = await multiContractWriteRigged();
      setIsRolling(false);
      setRolled(false);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    if (videoRef.current && !isRolling) {
      videoRef.current.currentTime = 9999;
    }
  }, [isRolling]);

  const wrapInTryCatch =
    (fn: () => Promise<any>, errorMessageFnDescription: string) => async () => {
      try {
        await fn().then(() => {});
      } catch (error) {
        console.error(
          `Error calling ${errorMessageFnDescription} function`,
          error,
        );
      }
    };

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <div className="py-10 px-10">
      <div className="grid grid-cols-3 max-lg:grid-cols-1 text-primary">
        <div className="max-lg:row-start-2">
          <RollEvents rolls={rolls} />
        </div>

        <div className="flex flex-col items-center pt-4 max-lg:row-start-1">
          <div className="flex w-full justify-center">
            <span className="text-xl">
              Roll a 0, 1, 2, 3, 4 or 5 to win the prize!{" "}
            </span>
          </div>

          <div className="flex items-center mt-1">
            <span className="text-lg mr-2">Prize:</span>
            <Amount
              amount={prize ? Number(formatEther(Number(prize))) : 0}
              showUsdPrice
              className="text-lg"
            />
          </div>

          <button
            onClick={async () => {
              if (!rolled) {
                setRolled(true);
              }
              setIsRolling(true);
              const wrappedRandomDiceRoll = wrapInTryCatch(
                handleDice,
                "randomDiceRoll",
              );
              await wrappedRandomDiceRoll();
            }}
            disabled={isRolling}
            className="mt-2 btn btn-secondary btn-xl normal-case font-xl text-lg text-base-100"
          >
            Roll the dice!
          </button>
          <div className="mt-4 pt-2 flex flex-col items-center w-full justify-center border-t-4 border-primary">
            <span className="text-2xl">Rigged Roll</span>
            <div className="flex mt-2 items-center">
              <span className="mr-2 text-lg">Address:</span>
              <Address size="lg" address={riggedRollContract?.address} />
            </div>
            <div className="flex mt-1 items-center">
              <span className="text-lg mr-2">Balance:</span>
              <Amount
                amount={Number(riggedRollBalance?.value || 0)}
                showUsdPrice
                className="text-lg"
              />
            </div>
          </div>
          {
            <button
              onClick={() => {
                if (!rolled) {
                  setRolled(true);
                }
                setIsRolling(true);
                handleRigged();
              }}
              disabled={isRolling}
              className="mt-2 btn btn-secondary btn-xl normal-case font-xl text-lg text-base-100"
            >
              Rigged Roll!
            </button>
          }

          <div className="flex mt-8">
            {rolled ? (
              isRolling ? (
                <video
                  key="rolling"
                  width={300}
                  height={300}
                  loop
                  src="/rolls/Spin.webm"
                  autoPlay
                />
              ) : (
                <video
                  key="rolled"
                  width={300}
                  height={300}
                  src={`/rolls/${rolls[0]?.roll || "0"}.webm`}
                  autoPlay
                />
              )
            ) : (
              <video
                ref={videoRef}
                key="last"
                width={300}
                height={300}
                src={`/rolls/${rolls[0]?.roll || "0"}.webm`}
              />
            )}
          </div>
        </div>

        <div className="max-lg:row-start-3">
          <WinnerEvents winners={winners} />
        </div>
      </div>
    </div>
  );
};

export default DiceGame;
