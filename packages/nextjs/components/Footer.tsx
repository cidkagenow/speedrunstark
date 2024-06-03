import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";
import { useTargetNetwork } from "~~/hooks/scaffold-stark/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";
import { devnet } from "@starknet-react/chains";
import Link from "next/link";
import {
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Faucet } from "./scaffold-stark";
import { getBlockExplorerLink } from "~~/utils/scaffold-stark";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(
    (state) => state.nativeCurrencyPrice,
  );
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === devnet.id;

  return (
    <div className="min-h-0 py-5 px-1 lg:mb-0 bg-base-100 text-primary">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none ">
          <div className="flex md:flex-row gap-2 pointer-events-auto text-[12px] sm:text-[16px]">
            {nativeCurrencyPrice > 0 && (
              <div>
                <div className="btn btn-primary btn-sm font-normal gap-1 cursor-auto bg-base-300 text-base-100 border-base-100 ">
                  <CurrencyDollarIcon className="h-4 w-4" />
                  <span>{nativeCurrencyPrice}</span>
                </div>
              </div>
            )}
            {isLocalNetwork && (
              <>
                <Faucet />
                <Link
                  href={getBlockExplorerLink(targetNetwork)}
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  passHref
                  className="btn btn-primary btn-sm font-normal gap-1 text-base-100 border-base-100 "
                >
                  <MagnifyingGlassIcon className="h-4 w-4" />
                  <span>Block Explorer</span>
                </Link>
              </>
            )}
          </div>
          <SwitchTheme
            className={`pointer-events-auto ${
              isLocalNetwork ? "self-end md:self-auto" : ""
            }`}
          />
        </div>
      </div>
      <div className="w-full ">
        <ul className="menu menu-horizontal w-full ">
          <div className="flex justify-center items-center gap-2 text-sm w-full ">
            <div className="text-center">
              <a
                href="https://github.com/Quantum3-Labs/scaffold-stark-2"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                Fork me
              </a>
            </div>
            <span>·</span>
            <div className="flex justify-center items-center gap-2">
              <p className="m-0 text-center">
                Built with <HeartIcon className="inline-block h-4 w-4" /> by
              </p>
              <a
                className="flex justify-center items-center gap-1"
                href="https://quantum3labs.com/"
                target="_blank"
                rel="noreferrer"
              >
                <BuidlGuidlLogo className="w-3 h-5 pb-1" />
                <span className="link">Q3 Labs</span>
              </a>
              <p className="m-0 text-center">at</p>
              <a
                className="flex justify-center items-center gap-1"
                href="https://buidlguidl.com/"
                target="_blank"
                rel="noreferrer"
              >
                <BuidlGuidlLogo className="w-3 h-5 pb-1" />
                <span className="link">BuidlGuidl</span>
              </a>
            </div>
            <span>·</span>
            <div className="text-center ">
              <a
                href="https://t.me/+wO3PtlRAreo4MDI9"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                Support
              </a>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
