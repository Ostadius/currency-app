import React,{Component} from 'react';
import axios from 'axios';
import classes from './Exchange.css';
class Exchange extends Component {
  state={
        result:null,
        fromCurrency: "USD",
        toCurrency: "GBP",
        amount: 1,
        currencies: []
  }
  componentDidMount(){
    axios
         .get("https://api.openrates.io/latest")
         .then(response => {
           console.log(response.data);
           const currencyAr = ["EUR"];
           for (const key in response.data.rates) {
             currencyAr.push(key);
           }
           console.log(currencyAr);
           this.setState({ currencies: currencyAr });
         })
         .catch(err => {
           console.log("oppps", err);
         });
  }
  selectHandler = event => {
    if (event.target.name === "from") {
      this.setState({ fromCurrency: event.target.value });
    } else {
      if (event.target.name === "to") {
        this.setState({ toCurrency: event.target.value });
      }
    }
  };
  convertHandler = () => {
    if (this.state.fromCurrency !== this.state.toCurrency) {
      axios
        .get(
          `https://api.openrates.io/latest?base=${
            this.state.fromCurrency
          }&symbols=${this.state.toCurrency}`
        )
        .then(response => {
          const result =
            this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result: result.toFixed(3) });
        })
        .catch(error => {
          console.log("Opps", error.message);
        });
    } else {
      this.setState({ result: "You cant convert the same currency!" });
    }
  };
  render(){
    return(
      <div className={classes.Exchange}>
             <h2>
               <span>Currency</span>Converter
               <span role="img" aria-label="money">
                 &#x1f4b5;
               </span>
             </h2>
             <div className="From">
               <input
                 name="amount"
                 type="text"
                 value={this.state.amount}
                 onChange={event => this.setState({ amount: event.target.value })}
               />
               <select
                 name="from"
                 onChange={event => this.selectHandler(event)}
                 value={this.state.fromCurrency}
               >
                 {this.state.currencies.map(cur => (
                   <option key={cur}>{cur}</option>
                 ))}
               </select>
               <select
                 name="to"
                 onChange={event => this.selectHandler(event)}
                 value={this.state.toCurrency}
               >
                 {this.state.currencies.map(cur => (
                   <option key={cur}>{cur}</option>
                 ))}
               </select>
               <button onClick={this.convertHandler}>Convert</button>
               {this.state.result && <h3>{this.state.result}</h3>}
             </div>
           </div>
    );
  }
}
export default Exchange;
