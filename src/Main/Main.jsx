import { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

import { currencySelector } from "../redux/currency/currencySelectors";

import {
  operations,
  options1,
  options2,
  ratesByCurrency,
} from "../utils/currencyUtils";
import { useCurrencyUpdate } from "../hooks/useCurrency";

function Main() {
  const rates = useSelector(currencySelector);

  const ratesByCurrencyProps = ratesByCurrency(rates);

  const [inputValue1, setInputValue1] = useState();
  const [inputValue2, setInputValue2] = useState();
  const [selectedOption1, setSelectedOption1] = useState("USD");
  const [selectedOption2, setSelectedOption2] = useState("EUR");

  const options1Props = options1(rates, selectedOption2);
  const options2Props = options2(rates, selectedOption1);

  const operationsProps = operations(ratesByCurrencyProps);

  useCurrencyUpdate(selectedOption1, selectedOption2);

  const handleInputChange1 = e => {
    const value = e.target.value;
    setInputValue1(value);

    if (value === "") {
      setInputValue2("");
    } else {
      const operation = operationsProps[selectedOption1 + selectedOption2];
      if (operation) {
        const result = operation(e.target.value);
        setInputValue2(parseFloat(result.toFixed(2)));
      }
    }
  };

  const handleInputChange2 = e => {
    const value = e.target.value;
    setInputValue2(value);

    if (value === "") {
      setInputValue1("");
    } else {
      const operation = operationsProps[selectedOption2 + selectedOption1];
      if (operation) {
        const result = operation(e.target.value);
        setInputValue1(parseFloat(result.toFixed(2)));
      }
    }
  };

  const handleSelectChange1 = selectedOption => {
    setSelectedOption1(selectedOption.value);
    const operation = operationsProps[selectedOption.value + selectedOption2];
    if (operation) {
      const result = operation(inputValue1);
      setInputValue2(parseFloat(result.toFixed(2)));
    }
  };

  const handleSelectChange2 = selectedOption => {
    setSelectedOption2(selectedOption.value);
    const operation = operationsProps[selectedOption.value + selectedOption1];
    if (operation) {
      const result = operation(inputValue2);
      setInputValue1(parseFloat(result.toFixed(2)));
    }
  };

  return (
    <main className="main-section">
      <div className="main-section-from">
        <input
          type="number"
          name="currency"
          onChange={handleInputChange1}
          value={inputValue1}
          placeholder="enter currency"
          className="main-section-input"
        />
        <Select
          options={options1Props}
          onChange={handleSelectChange1}
          className="main-section-selector"
          defaultValue={options1Props[0]}
        />
      </div>
      <div className="main-section-from">
        <input
          type="number"
          name="currency"
          onChange={handleInputChange2}
          value={inputValue2}
          placeholder="enter currency"
          className="main-section-input"
        />
        <Select
          options={options2Props}
          onChange={handleSelectChange2}
          className="main-section-selector"
          defaultValue={options2Props[0]}
        />
      </div>
    </main>
  );
}

export default Main;
