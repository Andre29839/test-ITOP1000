import ReactCountryFlag from "react-country-flag";

export const options1 = (rates, selectedOption2) => [
  {
    value: rates[0].currencyNames,
    label: (
      <>
        <ReactCountryFlag countryCode="US" svg /> {rates[0].currencyNames}
      </>
    ),
    isDisabled: selectedOption2 === rates[0].currencyNames,
  },
  {
    value: rates[1].currencyNames,
    label: (
      <>
        <ReactCountryFlag countryCode="EU" svg /> {rates[1].currencyNames}
      </>
    ),
    isDisabled: selectedOption2 === rates[1].currencyNames,
  },
  {
    value: "UAH",
    label: (
      <>
        <ReactCountryFlag countryCode="UA" svg /> UAH
      </>
    ),
    isDisabled: selectedOption2 === "UAH",
  },
];

export const options2 = (rates, selectedOption1) => [
  {
    value: rates[1].currencyNames,
    label: (
      <>
        <ReactCountryFlag countryCode="EU" svg /> {rates[1].currencyNames}
      </>
    ),
    isDisabled: selectedOption1 === rates[1].currencyNames,
  },
  {
    value: rates[0].currencyNames,
    label: (
      <>
        <ReactCountryFlag countryCode="US" svg /> {rates[0].currencyNames}
      </>
    ),
    isDisabled: selectedOption1 === rates[0].currencyNames,
  },
  {
    value: "UAH",
    label: (
      <>
        <ReactCountryFlag countryCode="UA" svg /> UAH
      </>
    ),
    isDisabled: selectedOption1 === "UAH",
  },
];

export const ratesByCurrency = rates =>
  rates.reduce((acc, rate) => {
    acc[rate.currencyNames] = rate.rateBuy;
    return acc;
  }, {});

export const operations = ratesByCurrency => ({
  USDUAH: value => value * ratesByCurrency["USD"],
  UAHUSD: value => value / ratesByCurrency["USD"],
  EURUAH: value => value * ratesByCurrency["EUR"],
  UAHEUR: value => value / ratesByCurrency["EUR"],
  USDEUR: value => (value * ratesByCurrency["USD"]) / ratesByCurrency["EUR"],
  EURUSD: value => (value * ratesByCurrency["EUR"]) / ratesByCurrency["USD"],
});
