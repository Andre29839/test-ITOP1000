import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { currencyThunk } from "../redux/currency/currencyThunk";
import { currencySelector } from "../redux/currency/currencySelectors";

export const useCurrencyUpdate = (selectedOption1, selectedOption2) => {
  const dispatch = useDispatch();
  const selectedCurrency = useSelector(currencySelector);

  const updateLastUpdatedTime = () => {
    const newTime = Date.now();
    localStorage.setItem("lastUpdatedTime", newTime);
  };

  useEffect(() => {
    const lastUpdatedTime = localStorage.getItem("lastUpdatedTime");

    const isHourPassed = () => {
      const oneHourUpdate = 60 * 60 * 1000;
      return Date.now() - Number(lastUpdatedTime) >= oneHourUpdate;
    };

    if (isHourPassed() || !lastUpdatedTime) {
      dispatch(currencyThunk());
      updateLastUpdatedTime();
    }
  }, [dispatch, selectedCurrency, selectedOption1, selectedOption2]);
};
