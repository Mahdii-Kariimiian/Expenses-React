import React from "react";
import Nav from "./Nav";
import Input from "./Input";
import Balance from "./Balance";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <Nav />
            <div className="p-5 md:text-xl">
                <div className="md:flex gap-5">
                    <Balance />
                    <Input />
                </div>
                <Outlet />
            </div>
                <Footer />
        </div>
    );
}

export default Layout;
