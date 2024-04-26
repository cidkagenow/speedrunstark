"use client";

import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-stark/Address";

const Events: NextPage = () => {
  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div>
        <div className="text-center mb-4">
          <span className="block text-2xl font-bold">Buy Token Events</span>
        </div>
        <div className="overflow-x-auto shadow-lg">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="bg-primary text-base-100">Buyer</th>
                <th className="bg-primary text-base-100">Amount of Tokens</th>
                <th className="bg-primary text-base-100">Amount of ETH</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3} className="text-center">
                  No events found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Events;
