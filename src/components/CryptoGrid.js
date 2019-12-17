import React, { Component } from "react";
import Cryptocurrency from "./Cryptocurrency";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import Nprogress from "nprogress";

class CryptoGrid extends Component {
  componentDidMount() {
    Nprogress.start();
  }
  render() {
    if (this.props.cryptocurrencies) {
      Nprogress.done();
      const { cryptocurrencies } = this.props;
      return (
        <div className="mx-auto">
          <table className="table">
            <thead className="t-header">
              <tr className="text-center">
                <th>Rank</th>
                <th>Name</th>
                <th>Short name</th>
                <th>$ Value</th>
                <th>last 24h</th>
                <th>Amount you own</th>
                <th>$ value of your coin</th>
              </tr>
            </thead>
            <TransitionGroup component="tbody">
              {cryptocurrencies.map(crypto => (
                <CSSTransition
                  key={crypto.id}
                  timeout={{ enter: 500, exit: 500 }}
                  classNames="item"
                  unmountOnExit
                >
                  <Cryptocurrency
                    key={crypto.id}
                    crypto={crypto}
                    cryptocurrencies={cryptocurrencies}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </table>
        </div>
      );
    }
  }
}

export default CryptoGrid;
