import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockDifficulty, setBlockDifficulty] = useState();
  const [blockGasLimit, setBlockGasLimit] = useState();
  const [blockTransactions, setBlockTransactions] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    async function getBlockDifficulty() {
      setBlockDifficulty((await alchemy.core.getBlock()).difficulty);
    }
    //getBlockGasLimit()という関数を作る
    async function getBlockGasLimit() {
      setBlockGasLimit((await alchemy.core.getBlock()).gasLimit.toString());
    }

    //getBlockTransactions();を書く
    async function getBlockTransactions() {
      setBlockTransactions((await alchemy.core.getBlock()).transactions);
    }

    getBlockNumber();
    getBlockDifficulty();
    getBlockGasLimit();
    // getBlockTransactions();
  });

  return (
    <div className="App">
      <div>Block Number: {blockNumber}</div>
      <div>Block Difficulty: {blockDifficulty}</div>
      <div>Block Gas Limit: {blockGasLimit}</div>
      <div>Block Transactions: </div>
      {/* //blockTransactions内のtransactionを表示する．ただし最初の10個だけ */}
      {/* さらにそのトランザクションをクリックするとそのトランザクションの詳細情報が表示されるページへ遷移する */}
    </div>
  );
}

export default App;
