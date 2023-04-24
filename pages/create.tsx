import React, { useState } from 'react';
import { TransactionBlock } from '@mysten/sui.js';
import { useWalletKit } from '@mysten/wallet-kit';
import LoadModal from '@/components/LoadModal';
import { PACKAGE_OBJECT_ID } from '../utils/constants';

const Create = () => {
  const { signAndExecuteTransactionBlock } = useWalletKit();

  // fields
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [inputAddresses, setInputAddresses] = useState('');

  // Modal
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [hash, setHash] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const closeHandler = () => {
    setVisible(false);
    setErrMsg('');
  };

  const handleAddressesChange = (e: any) => {
    setInputAddresses(e.target.value);
  };

  const addressesArray = inputAddresses
    .split(',')
    .map((address) => address.trim());

  // SUI blockchain Connection

  const create = async () => {
    setVisible(true);
    setLoading(true);

    try {
      const tx = new TransactionBlock();

      // const startTime = 1682831812;
      // const endTime = 1682745412;

      tx.moveCall({
        target:
          // '0x9b218c7bebb08ef1fbe2d3725aa68aa4c2e86f04e7fa704139daa2a908a2648e::IDO::create_ido',
          `${PACKAGE_OBJECT_ID}::IDO::create_ido`,

        arguments: [
          tx.pure(startTime),
          // tx.pure(Date.now),
          tx.pure(endTime),
          tx.pure(addressesArray),
        ],
      });

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
      <div className="mt-16">
        <div className="bg-[#10172A] rounded-md shadow-md px-6 py-8 mx-auto max-w-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-white font-bold mb-2">
              Start Time
            </label>
            <input
              id="time"
              name="Epoch Start Time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
              className="appearance-none bg-[#1E293B] rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white font-bold mb-2">
              End Time
            </label>
            <input
              id="time"
              name="Epoch End Time"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
              className="appearance-none bg-[#1E293B] rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter End Time in Epoch"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-white font-bold mb-2"
            >
              Address
            </label>

            <input
              id="address"
              name="address"
              value={inputAddresses}
              onChange={handleAddressesChange}
              className="appearance-none bg-[#1E293B] rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your address"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-purple-200 hover:bg-purple-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={create}
            >
              Submit
            </button>
          </div>
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

export default Create;

// <button
//   type="submit"
//   className="bg-purple-200 hover:bg-purple-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//   onClick={create}
// >
//   Click
// </button>
