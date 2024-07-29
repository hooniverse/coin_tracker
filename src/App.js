import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]); // api 코인 정보 받아오기
  const [money, setMoney] = useState(""); // 내 보유 USD
  const [selcoin, setSelcoin] = useState(0);
  const [coinname, setCoinname] = useState("");

  const selectCoin = (event) =>{
    setSelcoin(event.target.value);
    setCoinname(event.target.symbol);
    console.log(selcoin);
    console.log(coinname);
  }
  const onChange = (event) =>{
    setMoney(event.target.value);
  }
    useEffect(()=>{
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response)=> response.json())
    .then((json)=>{
      setCoins(json);
      setLoading(false);
    });
    },[]);

  return (
    <div>
      <h1>The Coins! {coins.length}</h1>
      {loading ? 
      <strong>Loading...</strong>: 
      <input onChange={onChange} type='number' value={money} placeholder='보유 USD'></input>
      }
      
      <hr/>
      <select onChange={selectCoin}>{coins.map((coin, index)=><option key={index} value={coin.quotes.USD.price}>{coin.id} {coin.symbol} $ {coin.quotes.USD.price} USD</option>)}</select>
      {selcoin >0 ? <h2>{money} USD으로 {(money/selcoin).toFixed(2)} {coinname}살 수 있습니다.</h2>:null}
    </div>
  );
}

export default App;
