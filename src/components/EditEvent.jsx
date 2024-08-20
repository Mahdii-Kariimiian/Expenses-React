import React, { useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";

function EditEvent() {
    const navigation = useNavigate();
    const id = useParams().id;

    const { EventArray, setEventArray } = useContext(AppContext);

    const currentEvent = EventArray.find((event) => event.id === id);

    const [editText, setEditText] = useState(currentEvent.text);
    const [editMoney, setEditMoney] = useState(currentEvent.money);
    const [editCategory, setEditCategory] = useState(currentEvent.category);

    console.log(currentEvent);
    console.log(editCategory, editMoney, editText);

    function handleEdit(e) {
        e.preventDefault();
        if (currentEvent.text && currentEvent.money) {
            const updatedArray = EventArray.map((event) => {
                if (event.id === id) {
                    return {
                        ...event,
                        text: editText,
                        money: editMoney,
                        category: editCategory,
                    };
                } else {
                    return event;
                }
            });

            setEventArray(updatedArray);
            localStorage.setItem("EventArray", JSON.stringify(updatedArray));
            navigation("/");
        }
    }

    return (
        <div>
            <button>
                <Link to="/">Back</Link>
            </button>

            <form className="flex flex-col border-2 border-teal-600 rounded-md p-5 mb-2">
                <label className="pb-1" htmlFor="transaction-text-edit">
                    Text
                </label>
                <input
                    onChange={(e) => setEditText(e.target.value)}
                    value={editText}
                    type="text"
                    name="transaction-text-edit"
                    className="p-2 mb-2 border-grey-300 border-2 rounded-md"
                    placeholder="Enter text"
                    required
                />

                <label className="pb-1" htmlFor="transaction-money-edit">
                    Amount
                </label>
                <input
                    onChange={(e) => setEditMoney(e.target.value)}
                    value={editMoney}
                    type="number"
                    name="transaction-money-edit"
                    className="p-2 mb-2 border-grey-300 border-2 rounded-md"
                    placeholder="(negative - expense, positive - income)"
                    required
                />

                <label className="pb-1" htmlFor="Categories-edit">
                    Categories
                </label>
                <select
                    onChange={(e) => setEditCategory(e.target.value)}
                    value={editCategory}
                    className="p-2 mb-2 border-grey-300 border-2 rounded-md"
                    name="Categories-edit"
                    id="Categories"
                >
                    <option value="no-category">No Category</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Transportation">Transportation</option>
                    <option value="clothing">clothing</option>
                </select>

                <button
                    onClick={(e) => handleEdit(e)}
                    className="p-2 mt-7 rounded-sm bg-teal-600 text-white font-bold hover:bg-teal-500"
                    type="submit"
                >
                    Edit transaction
                </button>
            </form>
        </div>
    );
}

export default EditEvent;
