import React, { useContext } from "react";
import { AppContext } from "../App";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Input() {
    // Use context to access the state of the app
    const {
        text,
        setText,
        money,
        setMoney,
        category,
        setCategory,
        EventArray,
        setEventArray,
    } = useContext(AppContext);

    // Success Toast function
    const notifySuccess = () => {
        toast.success("Transaction added successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    // Error Toast function
    const notifyError = () => {
        toast.error("Please enter a valid amount and text", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    // Add entry
    function handleClick(e) {
        e.preventDefault();
        if (text === "" || money === "") {
            notifyError();
            return;
        }

        const newEvent = {
            id: nanoid(),
            text,
            money,
            category,
        };
        setEventArray((prevArray) => [...prevArray, newEvent]);
        setText("");
        setMoney("");
        setCategory("no-category");
        notifySuccess();
    }

    return (
        <form className=" md:w-3/4 flex text-lg flex-col border-2 border-teal-600 rounded-md p-5 mb-2">
            <label className="pb-1" htmlFor="transaction-text">
                Transaction
            </label>
            <input
                onChange={(e) => setText(e.target.value)}
                value={text}
                type="text"
                name="transaction-text"
                className="py-2 px-2 mb-1 border-grey-300 border-2 rounded-md"
                placeholder="Enter transaction"
                required
            />

            <label className="pb-1" htmlFor="transaction-money">
                Amount
            </label>
            <input
                onChange={(e) => setMoney(e.target.value)}
                value={money}
                type="number"
                name="transaction-money"
                className="py-2 px-2 mb-1 border-grey-300 border-2 rounded-md"
                placeholder="(negative - expense, positive - income)"
                required
            />

            <label className="pb-1" htmlFor="Categories">
                Categories
            </label>
            <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="py-2 px-2 mb-5 border-grey-300 border-2 rounded-md"
                name="Categories"
                id="Categories"
            >
                <option value="no-category">No Category</option>
                <option value="Groceries">Groceries</option>
                <option value="Transportation">Transportation</option>
                <option value="mortgage or rent">Mortgage or Rent</option>
                <option value="household repairs">Household repairs</option>
                <option value="food">Food</option>
                <option value="restaurants">Restaurants</option>
                <option value="healthcare">Healthcare</option>
                <option value="internet">Internet</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="vacation">Vacation</option>
                <option value="other">Other</option>
            </select>

            <div>
                <button
                    onClick={(e) => {
                        handleClick(e);
                    }}
                    className=" whitespace-nowrap md:m-auto p-2 md:px-10 mt-3 rounded-md bg-teal-600 text-white font-bold hover:bg-teal-500"
                    type="submit"
                >
                    Add transaction
                </button>
            </div>
            <ToastContainer />
        </form>
    );
}

export default Input;
