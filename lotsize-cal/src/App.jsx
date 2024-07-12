import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(localStorage.getItem("balance"));

  const [risk, setRisk] = useState(localStorage.getItem("risk"));

  const [symbol, setSymbol] = useState(localStorage.getItem("symbol"));

  const [sl, setSL] = useState(localStorage.getItem("sl"));
  const [lotSize, setLotSize] = useState(0);

  const handleChange = (event) => {
    localStorage.setItem("symbol", event.target.value);
    setSymbol(event.target.value);
  };

  useEffect(() => {
    setBalance(localStorage.getItem("balance"));
    setRisk(localStorage.getItem("risk"));
  });

  useEffect(() => {
    const lot =
      symbol === "Gold"
        ? goldCal(balance, risk, sl)
        : forexCal(balance, risk, sl);
    setLotSize(lot.toFixed(2));
  });

  return (
    <div className="font-main py-[100px] flex flex-col items-center gap-[40px]">
      <div className="flex flex-col gap-5">
        <div>
          <div className="text-md">Total Balance</div>
          <TextField
            type="number"
            value={balance}
            placeholder="USD"
            onChange={(e) => {
              localStorage.setItem("balance", e.target.value);
              setBalance(e.target.value);
            }}
          />
        </div>

        <div>
          <div className="text-md">Risk %</div>
          <TextField
            type="number"
            value={risk}
            placeholder="1-100"
            onChange={(e) => {
              localStorage.setItem("risk", e.target.value);
              setRisk(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <FormControl>
          <div>Symbol</div>
          <RadioGroup row onChange={handleChange} value={symbol}>
            <FormControlLabel value="Gold" control={<Radio />} label="Gold" />
            <FormControlLabel value="Forex" control={<Radio />} label="Forex" />
          </RadioGroup>
        </FormControl>
        <div className="text-md">{`StopLoss (TradingView)`}</div>
        <TextField
          type="number"
          value={sl}
          onChange={(e) => {
            localStorage.setItem("sl", e.target.value);
            setSL(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-xl text-center">Lot Size</div>
        <div className="text-4xl text-center ">{lotSize}</div>
      </div>
    </div>
  );
}

export default App;

const goldCal = (balance, risk, sl) => {
  const result = (balance * (risk / 100)) / sl;
  return result;
};

const forexCal = (balance, risk, sl) => {
  const result = (balance * (risk / 100)) / (sl * 10);
  return result;
};
