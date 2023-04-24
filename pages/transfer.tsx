import React, { useState } from 'react';
import { TransactionBlock } from '@mysten/sui.js';
import { useWalletKit } from '@mysten/wallet-kit';
import { PACKAGE_OBJECT_ID } from '../utils/constants';
import LoadModal from '@/components/LoadModal';

const Transfer = () => {
  const { signAndExecuteTransactionBlock } = useWalletKit();

  // Modal
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [hash, setHash] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [address, setAddress] = useState('');

  const closeHandler = () => {
    setVisible(false);
    setErrMsg('');
  };

  const transfer = async () => {
    setVisible(true);
    setLoading(true);
    try {
      const tx = new TransactionBlock();

      const recipient =
        '0x32d8abc746056dcfafbf45850a8286531d7231c736af117f5185f16ec72e4037';
      const [coin] = tx.splitCoins(tx.gas, [tx.pure(1000000000)]);

      tx.moveCall({
        target: `${PACKAGE_OBJECT_ID}::IDO::fund_ido`,

        arguments: [
          // tx.object(ido),
          tx.transferObjects([coin], tx.pure(recipient)),
        ],

        // typeArguments: ['0x2::sui::SUI'],
      });
      tx.setGasBudget(300000000);

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
      <div className="mt-[122px] max-w-md mx-auto">
        <div className="mb-6">
          <label htmlFor="message" className="block text-white font-bold mb-2">
            Recipient Address
          </label>
          <input
            id="address"
            name="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="appearance-none bg-[#1E293B] rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your address"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-purple-200 hover:bg-purple-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={transfer}
          >
            Submit
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

export default Transfer;
