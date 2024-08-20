import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Input() {
    const {
        text,
        setText,
        money,
        setMoney,
        category,
        setCategory,
        setEventArray,
        editId,
        saveEditedEntry,
    } = useContext(AppContext);

    const [activeButton, setActiveButton] = useState("Expense");

    // Handle amount input change
    const handleAmountChange = (e) => {
        let value = e.target.value;
        if (activeButton === "Expense" && !value.startsWith("-")) {
            value = `-${value}`;
        } else if (activeButton === "Income" && value.startsWith("-")) {
            value = value.substring(1);
        }
        setMoney(value);
    };

    // Handle button click
    const handleButtonClick = (type) => {
        setActiveButton(type);
        if (type === "Expense" && !money.startsWith("-")) {
            setMoney(`-${money}`);
        } else if (type === "Income" && money.startsWith("-")) {
            setMoney(money.substring(1));
        }
    };

    // Toastify
    const notifySuccess = () => {
        toast.success("Transaction added/updated successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const notifyError = () => {
        toast.error("Please enter a valid amount or text", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    function handleClick(e) {
        e.preventDefault();
        if (text === "" || money === "" || isNaN(parseFloat(money))) {
            notifyError();
            return;
        }

        if (editId) {
            saveEditedEntry();
        } else {
            const newEvent = {
                id: nanoid(),
                text,
                money,
                category,
                date: new Date().toLocaleDateString(),
            };
            setEventArray((prevArray) => [...prevArray, newEvent]);
        }

        setText("");
        setMoney("");
        setCategory("no-category");
        setActiveButton("Expense"); // Reset to Expense after submission
        notifySuccess();
    }

    return (
        <form className="md:w-3/4 flex text-lg flex-col border-2 border-teal-800 rounded-md p-5 mb-2">
            <label className="pb-1" htmlFor="transaction-text">
                Transaction
            </label>
            <input
                onChange={(e) => setText(e.target.value)}
                value={text}
                type="text"
                name="transaction-text"
                className="py-2 px-2 mb-2 border-grey-300 border-2 rounded-md"
                placeholder="Enter transaction"
                required
            />

            <label className="pb-1" htmlFor="transaction-money">
                Amount
            </label>
            <div className="flex gap-2">
                <button
                    type="button"
                    className={`bg-red-800 text-white rounded-md py-[13.5px] px-2 text-sm ${
                        activeButton === "Expense" ? "bg-red-600" : ""
                    } hover:bg-red-700`}
                    onClick={() => handleButtonClick("Expense")}
                >
                    Expense
                </button>
                <button
                    type="button"
                    className={`bg-lime-800 text-white rounded-md py-[13.5px] px-2 text-sm ${
                        activeButton === "Income" ? "bg-lime-600" : ""
                    } hover:bg-lime-700`}
                    onClick={() => handleButtonClick("Income")}
                >
                    Income
                </button>
                <div className="flex-grow">
                    <input
                        onChange={handleAmountChange}
                        value={money}
                        type="number"
                        name="transaction-money"
                        className="py-2 px-2 border-gray-300 border-2 rounded-md w-full"
                        placeholder="(negative - expense, positive - income)"
                        required
                    />
                </div>
            </div>

            <label className="pb-1 mt-2" htmlFor="Categories">
                Categories
            </label>
            <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="py-2 px-2 mb-5 border-grey-300 border-2 rounded-md"
                name="Categories"
                id="Categories"
            >
                <option value="no category">No Category</option>
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

            <button
                onClick={handleClick}
                className="whitespace-nowrap md:m-auto p-2 md:px-10  w-full rounded-md bg-teal-800 text-white font-bold hover:bg-teal-600"
                type="submit"
            >
                {editId ? "Save changes" : "Add transaction"}
            </button>

            <ToastContainer />
        </form>
    );
}

export default Input;
