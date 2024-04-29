import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-stark";

interface IEvent {
  args: {
    swapper: string;
    ethInput?: string;
    tokenOutput?: string;
    tokensInput?: string;
    ethOutput?: string;
    liquidityProvider?: string;
    tokensOutput?: string;
    liquidityMinted?: string;
    liquidityRemover?: string;
    liquidityWithdrawn?: string;
  };
}

const Events: NextPage = () => {
  const EthToTokenEvents: IEvent[] = [];
  const tokenToEthEvents: IEvent[] = [];
  const liquidityProvidedEvents: IEvent[] = [];
  const liquidityRemovedEvents: IEvent[] = [];

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div>
          <div className="text-center mb-4">
            <span className="block text-2xl font-bold text-primary">
              ETH To Balloons Events
            </span>
          </div>
          <div className="overflow-x-auto ">
            <table className="table table-zebra w-full border-primary border-2">
              <thead className="text-base-100">
                <tr>
                  <th className="bg-primary">Address</th>
                  <th className="bg-primary">Amount of ETH in</th>
                  <th className="bg-primary">Amount of Balloons out</th>
                </tr>
              </thead>
              <tbody>
                {!EthToTokenEvents || EthToTokenEvents.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center text-primary">
                      No events found
                    </td>
                  </tr>
                ) : (
                  EthToTokenEvents.map((event, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center">
                          <Address address="0x0000000000000000000000000000000000000000" />
                        </td>
                        <td>0.0000</td>
                        <td>0.0000</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-center mb-4">
            <span className="block text-2xl font-bold text-primary">
              Balloons To ETH Events
            </span>
          </div>
          <div className="overflow-x-auto ">
            <table className="table table-zebra w-full border-primary border-2">
              <thead className="text-base-100">
                <tr>
                  <th className="bg-primary">Address</th>
                  <th className="bg-primary">Amount of Balloons In</th>
                  <th className="bg-primary">Amount of ETH Out</th>
                </tr>
              </thead>
              <tbody>
                {!tokenToEthEvents || tokenToEthEvents.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center text-primary">
                      No events found
                    </td>
                  </tr>
                ) : (
                  tokenToEthEvents.map((event, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center">
                          <Address address="0x0000000000000000000000000000000000000000" />
                        </td>
                        <td>0.0000</td>
                        <td>0.0000</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-center mb-4">
            <span className="block text-2xl font-bold text-primary">
              Liquidity Provided Events
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full border-primary border-2">
              <thead className="text-base-100">
                <tr>
                  <th className="bg-primary">Address</th>
                  <th className="bg-primary">Amount of ETH In</th>
                  <th className="bg-primary">Amount of Balloons In</th>
                  <th className="bg-primary">Liquidity Minted</th>
                </tr>
              </thead>
              <tbody>
                {!liquidityProvidedEvents ||
                liquidityProvidedEvents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-primary">
                      No events found
                    </td>
                  </tr>
                ) : (
                  liquidityProvidedEvents.map((event, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center">
                          <Address address="0x0000000000000000000000000000000000000000" />
                        </td>
                        <td>0.0000</td>
                        <td>0.0000</td>
                        <td>0.0000</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-center mb-4">
            <span className="block text-2xl font-bold text-primary">
              Liquidity Removed Events
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full border-primary border-2">
              <thead className="text-base-100">
                <tr>
                  <th className="bg-primary">Address</th>
                  <th className="bg-primary">Amount of ETH Out</th>
                  <th className="bg-primary">Amount of Balloons Out</th>
                  <th className="bg-primary">Liquidity Withdrawn</th>
                </tr>
              </thead>
              <tbody>
                {!liquidityRemovedEvents ||
                liquidityRemovedEvents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-primary">
                      No events found
                    </td>
                  </tr>
                ) : (
                  liquidityRemovedEvents.map((event, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center">
                          <Address address="0x0000000000000000000000000000000000000000" />
                        </td>
                        <td>0.0000</td>
                        <td>0.0000</td>
                        <td>0.0000</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
