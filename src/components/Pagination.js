import React from 'react';
import { Link } from "react-router-dom";

const Pagination = ({ cryptoPerPage, totalCrypto, handleClick }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCrypto / cryptoPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {
                    pageNumbers.map(number => (
                        <li className="page-item" key={number}>
                            <Link
                                onClick={() => {
                                    handleClick(number)
                                }}
                                to="/"
                                className="page-link m-1"
                            >
                                {number}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
        // <nav>
        //     <ul className="pagination justify-content-center">
        //         {
        //             pageNumbers.map(number => (
        //                 <Link
        //                     onClick={() => {
        //                         handleClick(number)
        //                     }}
        //                     to="/"
        //                     key={number}
        //                     className="page-link m-1"
        //                 >
        //                     {number}
        //                 </Link>
        //             ))
        //         }
        //     </ul>
        // </nav>
    )
}

export default Pagination