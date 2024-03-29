import React, { useState, createContext , useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import EventEntry from "./components/EventEntry";

import "../index.css";

export const AppContext = createContext();

function App() {
    const [text, setText] = useState("");
    const [money, setMoney] = useState(0);
    const [category, setCategory] = useState("no-category");
    const [EventArray, setEventArray] = useState(() => {
        const storedEventArray = localStorage.getItem("EventArray");
        return storedEventArray ? JSON.parse(storedEventArray) : []; 
    });

    useEffect(() => {
        localStorage.setItem("EventArray", JSON.stringify(EventArray));
    }, [EventArray]);
    
    // localStorage.removeItem("EventArray");

    return (
        <div>
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
                }}
            >
                <Router>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<EventEntry />} />
                        </Route>
                    </Routes>
                </Router>
            </AppContext.Provider>
        </div>
    );
}

export default App;
