import React from "react";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

function Nav() {
    return (
        <nav className="bg-teal-700 text-white font-bold flex items-center gap-2 px-5 py-7 ">
            <h1 className="sm:text-2xl">YOUR Expenses </h1>
            <h1 className="text-3xl">
                <FaMoneyBillTransfer />
            </h1>
            <div className="hidden sm:flex items-center gap-4 ml-auto">
                <ul className="flex gap-4 text-sm ">
                    <li className="hover:cursor-pointer">Log in</li>
                    <li className="hover:cursor-pointer">Contact us</li>
                </ul>
            </div>
            <div className="text-xl ml-auto sm:hidden">
                <GiHamburgerMenu />
            </div>
        </nav>
    );
}

export default Nav;
