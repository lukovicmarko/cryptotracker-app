import React, { Component } from "react";
import { Link } from "react-router-dom";

class Cryptocurrency extends Component {
  state = {
    amount: "",
    totalAmount: "",
    className: "btn btn-block btn-primary",
    isDisabled: true
  };

  componentDidMount() {
    this.getCurrencyValue();
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage = () => {
    const data = localStorage.getItem(this.props.crypto.symbol);
    if (data !== null) {
      JSON.parse(data);
      this.setState({
        amount: data,
        className: "btn btn-block btn-primary submit__button"
      });
    } else {
      this.setState({
        amount: ""
      });
    }
  };

  onFormChange = e => {
    const amount = e.target.value;
    //regex
    if (amount.match(/^\d*(\.\d{0,4})?$/)) {
      this.setState({
        amount
      });
    }
    if (amount) {
      this.setState({
        className: "btn btn-block btn-primary submit__button"
      });
    } else {
      this.setState({
        className: "btn btn-block btn-primary"
      });
    }
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { symbol } = this.props.crypto;
    localStorage.setItem(symbol, this.state.amount);
    this.getCurrencyValue();
  };

  getCurrencyValue = () => {
    const { symbol } = this.props.crypto;
    const { price } = this.props.crypto.quote.USD;
    const val = localStorage.getItem(symbol);
    let number = val * price;

    if (val === null) {
      return null;
    } else {
      return this.setState({
        totalAmount: number.toFixed(2)
      });
    }
  };

  render() {
    const { cmc_rank, id, name, symbol, quote, logo } = this.props.crypto;
    const { price, percent_change_24h } = quote.USD;
    return (
      <tr className="text-center body-list">
        <td className="align-middle">{cmc_rank}</td>
        <td className="align-middle">
          <img
            src={logo}
            className="mr-3"
            style={{ width: "30px" }}
            alt={name}
          />
          <Link
            to={{
              pathname: `/details/${id}`,
              state: { crypto: this.props.crypto }
            }}
            className="name"
          >
            <b>{name}</b>
          </Link>
        </td>
        <td className="align-middle">{symbol}</td>
        <td className="align-middle">$ {price}</td>
        <td className="align-middle">
          <span
            className={
              percent_change_24h < 0
                ? "badge badge-pill badge-danger p-3"
                : "badge badge-pill badge-success p-3"
            }
          >
            {percent_change_24h.toFixed(5)} %
          </span>
        </td>
        <td className="align-middle">
          <form onSubmit={this.onFormSubmit}>
            <div className="form-group">
              <input
                value={this.state.amount}
                onChange={this.onFormChange}
                type="text"
                name="amount"
                className="form-control text-center"
              />
              <br />
              <button
                disabled={this.state.amount ? null : this.state.isDisabled}
                type="submit"
                className={this.state.className}
              >
                Submit
              </button>
            </div>
          </form>
        </td>
        <td className="align-middle">
          <span className="badge badge-pill badge-info p-3">
            {this.state.totalAmount ? `${this.state.totalAmount} $` : `${0} $`}
          </span>
        </td>
      </tr>
    );
  }
}

export default Cryptocurrency;
