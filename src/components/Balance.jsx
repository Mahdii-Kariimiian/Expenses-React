import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";

function Balance() {
    const { eventArray } = useContext(AppContext);

    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        setIncome(
            eventArray.reduce((acc, event) => {
                if (event.money > 0) {
                    return Number(acc) + Number(event.money);
                } else {
                    return acc;
                }
            }, 0)
        );

        setExpense(
            eventArray.reduce((acc, event) => {
                if (event.money < 0) {
                    return Number(acc) - Number(event.money);
                } else {
                    return acc;
                }
            }, 0)
        );
    }, [eventArray]);

    useEffect(() => {
        setBalance((prev) => (prev = income - expense));
    }, [income, expense]);

    return (
        <div className="min-w-[280px] md:w-1/4 flex flex-col justify-between text-center font-bold border-2 border-teal-800 rounded-md p-5 mb-2">
            <h2 className="pb-4 text-xl border-2 py-5 border-teal-800 rounded-md whitespace-nowrap">
                Balance: <span> {balance.toFixed(2)} €</span>
            </h2>
            <div className="md:block justify-center">
                <div className="bg-lime-700 p-5 my-5 md:w-full md:rounded-md rounded-md whitespace-nowrap">
                    <h3>
                        Income <span> {income.toFixed(2)} €</span>
                    </h3>
                </div>
                <div className="bg-red-700 p-5 md:rounded-md md:w-full rounded-md whitespace-nowrap">
                    <h3>
                        Expense <span>{expense.toFixed(2)} €</span>
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default Balance;
