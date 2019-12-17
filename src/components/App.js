import React, { Component } from "react";
import CryptoGrid from "./CryptoGrid";
import Header from "./Header";
import Pagination from "./Pagination";

const API_KEY = "87c88d2f-d546-42d6-8382-58fe2128054b";

class App extends Component {
    state = {
        cryptocurrencies: [],
        currentPage: 1,
        cryptoPerPage: 10
    };

    componentDidMount() {
        this.loadData();
        //call Api every 60 seconds
        this.Interval = setInterval(() => {
            this.loadData();
        }, 60000);
    }

    loadData = async () => {
        const settings = {
            method: "GET",
            headers: {
                Accept: "Application/json",
                "Content-Type": "Application/json",
                "X-CMC_PRO_API_KEY": API_KEY
            }
        };

        try {
            const res = await fetch(
                "https://cors-anywhere.herokuApp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=50",
                settings
            );
            const result = await res.json();

            const value = result.data;

            //get all id's from cryptocurrencies
            const identifiers = [];
            value.forEach(val => {
                identifiers.push(val.id);
            });

            const info = await fetch(
                `https://cors-anywhere.herokuApp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${identifiers}`,
                settings
            );
            const infoResult = await info.json();

            //get icons, description, urls from infoResult array           
            for (let i in value) {
                value[i].logo = this.getCryptocurrenciesLogoById(
                    value[i].id,
                    infoResult.data
                );
                value[i].description = this.getCryptocurrenciesDescriptionById(
                    value[i].id,
                    infoResult.data
                );
                value[i].urls = this.getCryptocurrenciesUrlsById(
                    value[i].id,
                    infoResult.data
                );
            }

            this.setState({
                cryptocurrencies: result.data
            });
        } catch (e) {
            console.log(e);
        }
    };

    /*pronalazi logo u nizu po atributu ID*/
    getCryptocurrenciesLogoById = (infoId, infoResult) => {
        for (let i in infoResult) {
            if (infoResult[i].id === infoId) {
                return infoResult[i].logo;
            }
        }
    };
    /*pronalazi description u nizu po atributu ID*/
    getCryptocurrenciesDescriptionById = (infoId, infoResult) => {
        for (let i in infoResult) {
            if (infoResult[i].id === infoId) {
                return infoResult[i].description;
            }
        }
    };

    getCryptocurrenciesUrlsById = (infoId, infoResult) => {
        for (let i in infoResult) {
            if (infoResult[i].id === infoId) {
                return infoResult[i].urls;
            }
        }
        // infoResult.forEach(result => {
        //     if (result.id === infoId) {
        //         return result.urls;
        //     }
        // });
    };

    handleClick = e => {
        this.setState({
            currentPage: Number(e)
        });
    };

    componentWillUnmount() {
        clearTimeout(this.Interval);
    }

    render() {
        //Get current Crypto
        const { currentPage, cryptoPerPage, cryptocurrencies } = this.state;
        const indexOfLastCrypto = currentPage * cryptoPerPage;
        const indexOfFirstCrypto = indexOfLastCrypto - cryptoPerPage;
        const currentCrypto = cryptocurrencies.slice(
            indexOfFirstCrypto,
            indexOfLastCrypto
        );

        return (
            <>
                <Header title="Cryptotrack App" />
                <CryptoGrid cryptocurrencies={currentCrypto} />
                <Pagination
                    cryptoPerPage={cryptoPerPage}
                    totalCrypto={cryptocurrencies.length}
                    handleClick={this.handleClick}
                />
            </>
        );
    }
}

export default App;
