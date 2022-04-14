import { useState, useEffect } from "react";
import Moralis from "moralis/dist/moralis.min.js";
import "./App.css";

function App() {
  const appId = "kXjoOhQniSv6NAkrlceELZFoafLjL5C1xANVV30w";
  const serverUrl = "https://deoqbw6qywmq.usemoralis.com:2053/server";
  const [user, setUser] = useState();
  const [nft, setNft] = useState("");

  const moralisInit = async () => {
    Moralis.start({ serverUrl, appId });
    setUser(Moralis.User.current());
    if (!user) {
      try {
        let curruser = await Moralis.authenticate({
          signingMessage: "Hello World!",
        });
        setUser(curruser);
        // lazyMint();
      } catch (error) {
        console.log(error);
      }
    } else {
      Moralis.enableWeb3();
      // lazyMint();
    }
  };

  const lazyMint = async () => {
    console.log(Moralis.Plugins);
    const res = await Moralis.Plugins.rarible.lazyMint({
      chain: "rinkeby",
      userAddress: "0xc76235d153e17e410BB4B9D3bF5312F9758cf274",
      tokenType: "ERC721",
      tokenUri: "/ipfs/QmWLsBu6nS4ovaHbGAXprD1qEssJu4r5taQfB74sCG51tp",
      supply: 100,
      royaltiesAmount: 5, // 0.05% royalty. Optional
    });
    console.log(res);
    setNft(
      `https://rinkeby.rarible.com/token/${res.data.result.tokenAddress
        .toString()
        .toLowerCase()}:${res.data.result.tokenId}`
    );
  };

  useEffect(() => {
    moralisInit();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <button type="button" onClick={() => lazyMint()}>
            count
          </button>
          <a href={nft}>
            <button>View</button>
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
