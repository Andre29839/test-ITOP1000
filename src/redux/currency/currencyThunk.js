import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const currencyNames = {
  usd: "USD",
  eur: "EUR",
  usdeur: "USDEUR",
};

export const currencyThunk = createAsyncThunk(
  "currency/currencyThunk",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://api.monobank.ua/bank/currency");

      if (res.status !== 200) {
        throw new Error(`Error: ${res.status}`);
      }

      if (!res.data || !Array.isArray(res.data) || res.data.length === 0) {
        throw new Error("No data available");
      }

      if (res.data?.length) {
        const filteredArray = res.data
          .filter(
            el =>
              (el.currencyCodeA === 840 && el.currencyCodeB === 980) ||
              (el.currencyCodeA === 978 && el.currencyCodeB === 980) ||
              (el.currencyCodeA === 978 && el.currencyCodeB === 840)
          )
          .map(el => ({
            ...el,
            currencyNames:
              el.currencyCodeA === 840
                ? currencyNames.usd
                : el.currencyCodeB === 980
                ? currencyNames.eur
                : currencyNames.usdeur,
          }));

        if (filteredArray.length === 0) {
          throw new Error("No matching data found");
        }

        return filteredArray;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
