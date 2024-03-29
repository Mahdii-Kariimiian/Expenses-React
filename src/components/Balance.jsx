import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";

function Balance() {
    const { EventArray } = useContext(AppContext);

    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        setIncome(
            EventArray.reduce((acc, event) => {
                if (event.money > 0) {
                    return Number(acc) + Number(event.money);
                } else {
                    return acc;
                }
            }, 0)
        );

        setExpense(
            EventArray.reduce((acc, event) => {
                if (event.money < 0) {
                    return Number(acc) - Number(event.money);
                } else {
                    return acc;
                }
            }, 0)
        );
    }, [EventArray]);

    useEffect(() => {
        setBalance((prev) => (prev = income - expense));
    }, [income, expense]);

    return (
        <div className="min-w-[280px] md:w-1/4 flex flex-col justify-between text-center font-bold border-2 border-teal-600 rounded-md p-5 mb-2">
            <h2 className="pb-4 text-xl border-2 py-5 my-5 border-teal-600 rounded-md">
                Balance: <span> {balance} €</span>
            </h2>
            <div className="md:block flex justify-center">
                <div className="bg-lime-600 p-5 my-5 md:w-full md:rounded-md rounded-l-md w-1/2 ">
                    <h3>
                        Income <span> {income} €</span>
                    </h3>
                </div>
                <div className="bg-red-600 p-5 my-5 md:rounded-md md:w-full rounded-r-md w-1/2">
                    <h3>
                        Expense <span>{expense} €</span>
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default Balance;
