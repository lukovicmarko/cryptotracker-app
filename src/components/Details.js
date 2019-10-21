import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

import Nprogress from 'nprogress';

import {
    FaChevronCircleLeft,
    FaLink,
    FaRedditAlien,
    FaDollarSign,
    FaSignal,
    FaChartLine
} from "react-icons/fa";

class Details extends Component {
    componentDidMount() {
        Nprogress.start();
        Nprogress.done();
    }

    render() {
        const {
            name, logo, symbol, cmc_rank, urls, quote
        } = this.props.location.state.crypto;

        const website = urls.website[0];
        const reddit = urls.reddit[0];

        const { price, volume_24h, market_cap, percent_change_24h } = quote.USD;

        return (
            <div className="container-fluid">
                <h1 className="text-center">Cryptocurrency Details</h1>
                <Link to="/">
                    <h1>
                        <FaChevronCircleLeft className="cart-icon mb-5" />
                    </h1>
                </Link>

                <div className="col-md-12 card p-4">
                    <div className="row">
                        <div className="col-3">
                            <div className="rank">
                                Rank {cmc_rank}
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="website">
                                <a href={website} target="_blank">
                                    <FaLink className="mr-1" />
                                    Website
                                </a>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="website">
                                <a href={reddit} target="_blank">
                                    <FaRedditAlien className="mr-1" />
                                    Reddit
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-4">
                            <img src={logo} className="m-3" style={{ width: "40px" }} alt={name} />
                            <div className="content">
                                <h4>
                                    <em>
                                        <acronym title={name}>{name} ({symbol})</acronym>
                                    </em>
                                </h4>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-4 text-center">
                                    <h6 className="name">USD Price</h6>
                                    <FaDollarSign size={32} />
                                    {price.toFixed(3)}
                                </div>
                                <div className="col-4 text-center">
                                    <h6 className="name">24h Vol</h6>
                                    <FaSignal size={32} className="mr-2" />
                                    {volume_24h}
                                </div>
                                <div className="col-4 text-center">
                                    <h6 className="name">Market Cap</h6>
                                    <FaChartLine size={32} className="mr-2" />
                                    {market_cap}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <p className="mt-5 info">
                            Today <span className="name"><b>{name}</b></span> price in US dollars is currently <span className="info-text"><b>{price} USD</b></span>. A total of <span className="info-text"><b>{volume_24h} coin's</b></span> are currently circulating in the Market. <em>{name}</em> prices are currently experiencing a change of  <span className="info-text"><b>{percent_change_24h}</b> %</span>. Over the past 24 hours <span className="info-text"><b>{Math.ceil(market_cap)} M US dollars</b></span>  Bitcoin has been traded on Crypto Exchanges.
                        </p>
                    </div>
                </div >
            </div >
        )
    }
}

export default Details