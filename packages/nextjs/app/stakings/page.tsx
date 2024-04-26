import React from "react";

interface StakeEvent {
  args: [string, string];
}

interface StakingProps {
  stakeEvents: StakeEvent[] | undefined;
  isLoading: boolean;
}

const Staking: React.FC<StakingProps> = ({ stakeEvents, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5">
        <h1 className="text-center mb-3">
          <span className="block text-2xl font-bold">All Staking Events</span>
        </h1>
      </div>
      <div className="overflow-x-auto border border-base-300">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="bg-primary text-base-100">From</th>
              <th className="bg-primary text-base-100">Value</th>
            </tr>
          </thead>
          <tbody>
            {!stakeEvents || stakeEvents.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center">
                  No events found
                </td>
              </tr>
            ) : (
              stakeEvents.map((event, index) => (
                <tr key={index}>
                  <td>{event.args[0]}</td>
                  <td>{event.args[1] && event.args[1]} ETH</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Staking;
