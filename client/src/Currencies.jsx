import currencies from "./currencies.json";

function Currencies() {
  return (
    <div>
      {currencies.map((currency) => (
        <h2>
          <a href={`/price/${currency.currency}`}>{currency.currency}</a>: 
          {currency.country}
        </h2>
      ))}
    </div>
  );
}
export default Currencies;
