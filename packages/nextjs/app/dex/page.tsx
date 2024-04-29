"use client";

import { NextPage } from "next";
import {
  Address,
  AddressInput,
  EtherInput,
  IntegerInput,
} from "~~/components/scaffold-stark";
import { Curve, ICurveProps } from "~~/components/Curve";
import { useState } from "react";
import ButtonForm from "~~/components/Button/ButtonForm";

const Dex: NextPage = () => {
  const [ethReserve, setEthReserve] = useState(100);
  const [tokenReserve, setTokenReserve] = useState(1000);
  const [addingEth, setAddingEth] = useState(0);
  const [addingToken, setAddingToken] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [ethToTokenAmount, setEthToTokenAmount] = useState("");
  const [tokenToETHAmount, setTokenToETHAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [approveSpender, setApproveSpender] = useState("");
  const [approveAmount, setApproveAmount] = useState("");
  const [accountBalanceOf, setAccountBalanceOf] = useState("");
  const curveProps: ICurveProps = {
    ethReserve,
    tokenReserve,
    addingEth,
    addingToken,
    width: 400,
    height: 300,
  };

  return (
    <>
      <h1 className="text-center mb-4 mt-5">
        <span className="block text-xl text-right mr-7">🎈: 0.0000</span>
        <span className="block text-xl text-right mr-7">💦💦: 0.0000</span>
        <span className="block text-2xl mb-2 text-primary">SpeedRunStark</span>
        <span className="block text-4xl font-bold text-primary">
          Challenge 4: ⚖️ Build a DEX
        </span>
      </h1>
      <div className="items-start pt-10 grid grid-cols-1 md:grid-cols-2 content-start">
        <div className="px-5 py-5">
          <div className="bg-base-100 border-8 border-secondary rounded-xl p-8 m-8">
            <div className="flex flex-col text-center">
              <span className="text-3xl font-semibold mb-2">DEX Contract</span>
              <span className="block text-2xl mb-2 mx-auto">
                {/*<Address size="xl" address="0x"/>*/}
              </span>
              <span className="flex flex-row mx-auto mt-5">
                {" "}
                <span className="pl-8 text-xl">⚖️ 0.0000</span>
              </span>
            </div>
            <div className="py-3 px-4">
              <div className="flex mb-4 justify-center items-center">
                <span className="w-1/2">
                  ethToToken
                  <EtherInput
                    value={ethToTokenAmount}
                    onChange={(value) => {
                      setTokenToETHAmount("");
                      setEthToTokenAmount(value);
                    }}
                    name="ethToToken"
                  />
                </span>
                <ButtonForm onClick={() => console.log("click ethToToken")}>
                  Send
                </ButtonForm>
              </div>
              <div className="flex justify-center items-center">
                <span className="w-1/2">
                  tokenToETH
                  <IntegerInput
                    value={tokenToETHAmount}
                    onChange={(value) => {
                      setEthToTokenAmount("");
                      setTokenToETHAmount(value.toString());
                    }}
                    name="tokenToETH"
                    disableMultiplyBy1e18
                  />
                </span>
                <ButtonForm onClick={() => console.log("Click tokenToETH")}>
                  Send
                </ButtonForm>
              </div>
            </div>
            <p className="text-center text-primary-content text-xl mt-8 -ml-8">
              Liquidity (None)
            </p>
            <div className="px-4 py-3">
              <div className="flex mb-4 justify-center items-center">
                <span className="w-1/2">
                  Deposit
                  <EtherInput
                    value={depositAmount}
                    onChange={(value) => setDepositAmount(value)}
                  />
                </span>
                <ButtonForm onClick={() => console.log("Click Deposit")}>
                  Send
                </ButtonForm>
              </div>

              <div className="flex justify-center items-center">
                <span className="w-1/2">
                  Withdraw
                  <EtherInput
                    value={withdrawAmount}
                    onChange={(value) => setWithdrawAmount(value)}
                  />
                </span>
                <ButtonForm onClick={() => console.log("Click Withdraw")}>
                  Send
                </ButtonForm>
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-base-100 border-8 border-secondary rounded-xl py-5 p-8 m-8">
            <div className="flex flex-col text-center mt-2 mb-4 px-4">
              <span className="block text-3xl font-semibold mb-2">
                Balloons
              </span>
              <span className="mx-auto">
                {/*<Address size="xl"  address="0x" />*/}
              </span>
            </div>

            <div className=" px-4 py-3">
              <div className="flex flex-col gap-4 mb-4 justify-center items-center">
                <span className="w-1/2">
                  Approve
                  <AddressInput
                    value={approveSpender ?? ""}
                    onChange={(value) => setApproveSpender(value)}
                    placeholder="Address Spender"
                  />
                </span>
                <span className="w-1/2">
                  <IntegerInput
                    value={approveAmount}
                    onChange={(value) => setApproveAmount(value.toString())}
                    placeholder="Amount"
                    disableMultiplyBy1e18
                  />
                </span>
                <ButtonForm onClick={() => console.log("Click Approve")}>
                  Send
                </ButtonForm>
                <span className="w-1/2">
                  balanceOf
                  <AddressInput
                    value={""}
                    onChange={(value) => setAccountBalanceOf(value)}
                    placeholder="address Account"
                  />
                </span>
                <span className="font-bold bg-primary px-2 py-1 rounded-md text-base-100">
                  0.0000
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto p-8 m-8 md:sticky md:top-0">
          <Curve {...curveProps} />
        </div>
      </div>
    </>
  );
};

export default Dex;
