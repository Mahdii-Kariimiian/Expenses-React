import React, { useState, createContext, useEffect } from "react";
import EventEntry from "./components/EventEntry";
import Header from "./components/Header";
import Input from "./components/Input";
import Balance from "./components/Balance";
import Footer from "./components/Footer";
import "../index.css";

export const AppContext = createContext();

function App() {
    const [text, setText] = useState("");
    const [money, setMoney] = useState("");
    const [category, setCategory] = useState("no-category");
    const [EventArray, setEventArray] = useState(() => {
        const storedEventArray = localStorage.getItem("EventArray");
        return storedEventArray ? JSON.parse(storedEventArray) : [];
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        localStorage.setItem("EventArray", JSON.stringify(EventArray));
    }, [EventArray]);

    const startEditing = (id) => {
        const eventToEdit = EventArray.find((event) => event.id === id);
        if (eventToEdit) {
            setText(eventToEdit.text);
            setMoney(eventToEdit.money);
            setCategory(eventToEdit.category);
            setEditId(id);
        }
    };

    const saveEditedEntry = () => {
        if (editId !== null) {
            const updatedArray = EventArray.map((event) =>
                event.id === editId
                    ? { ...event, text, money, category }
                    : event
            );
            setEventArray(updatedArray);
            setEditId(null);
            setText("");
            setMoney("");
            setCategory("no-category");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <AppContext.Provider
                value={{
                    text,
                    setText,
                    money,
                    setMoney,
                    category,
                    setCategory,
                    EventArray,
                    setEventArray,
                    editId,
                    startEditing,
                    saveEditedEntry,
                }}
            >
                <Header />
                <main className="flex-grow p-5 md:text-xl">
                    <div className="md:flex gap-5">
                        <Balance />
                        <Input />
                    </div>
                    <EventEntry />
                </main>
                <Footer />
            </AppContext.Provider>
        </div>
    );
}

export default App;
