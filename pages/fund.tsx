import React, { useEffect, useState } from 'react';
import { JsonRpcProvider, TransactionBlock } from '@mysten/sui.js';
import { useWalletKit } from '@mysten/wallet-kit';
import LoadModal from '@/components/LoadModal';

import { PACKAGE_OBJECT_ID } from '../utils/constants';

const Fund = () => {
  const { signAndExecuteTransactionBlock } = useWalletKit();
  // Modal
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [hash, setHash] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const closeHandler = () => {
    setVisible(false);
    setErrMsg('');
  };

  const fund = async () => {
    setVisible(true);
    setLoading(true);
    try {
      const tx = new TransactionBlock();

      const ido =
        '0x29ed2bcbece977c69031176aeded3649b226e815a19a434e44fd77c850c0d63a';
      const clock =
        '0x0000000000000000000000000000000000000000000000000000000000000006';

      const [coin] = tx.splitCoins(tx.gas, [tx.pure(1000000000)]);

      tx.moveCall({
        target: `${PACKAGE_OBJECT_ID}::IDO::fund_ido`,

        arguments: [tx.object(ido), tx.object(clock), coin],
        typeArguments: ['0x2::sui::SUI'],
      });
      tx.setGasBudget(3000000);
      // tx.setGasPrice(gasPrice);

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });

      setHash(result.digest);
      console.log({ result });
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.error(err.message);

      if (err.message.includes('Rejected from user'))
        setErrMsg('You Reject the transaction ');
      else setErrMsg('Something went wrong');
    }
  };

  return (
    <>
      <div className="mt-[122px]">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-4 px-8 rounded-md shadow-lg">
          <h2 className="text-white font-bold text-lg mb-2">
            Fund our IDO and help us build the future of Web3!
          </h2>
          <p className="text-white mb-4">
            We are raising funds to build a decentralized platform that will
            revolutionize the way people interact with the blockchain. With your
            support, we can make this vision a reality.
          </p>
          <button
            className="bg-purple-200 hover:bg-purple-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow inline-block"
            onClick={fund}
          >
            Invest now
          </button>
        </div>
        <LoadModal
          visible={visible}
          closeHandler={closeHandler}
          hash={hash}
          isLoading={loading}
          errorMessage={errMsg}
        />
      </div>
    </>
  );
};

export default Fund;
