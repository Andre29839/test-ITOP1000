import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

import { currencySelector } from "../redux/currency/currencySelectors";
import { useCurrencyUpdate } from "../hooks/useCurrency";

const Header = () => {
  const [currency, setCurrency] = useState([]);

  const selectedCurrency = useSelector(currencySelector);

  useCurrencyUpdate();

  useEffect(() => {
    setCurrency(selectedCurrency);
  }, [selectedCurrency]);

  return (
    <header className="header-section">
      <div className="header-container">
        {currency?.length &&
          currency.slice(0, 2).map(e => {
            return (
              <ul className="header-list" key={nanoid()}>
                <li className="header-item-currency">{e.currencyNames}</li>
                <li className="header-item-buy">
                  {parseFloat(e.rateBuy).toFixed(2)}
                </li>
                <li className="header-item-sell">
                  {parseFloat(e.rateSell).toFixed(2)}
                </li>
              </ul>
            );
          })}
      </div>
    </header>
  );
};

export default Header;
