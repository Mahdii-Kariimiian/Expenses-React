import React, { useContext } from "react";
import { AppContext } from "../App";
import { CiCircleRemove, CiEdit } from "react-icons/ci";

function EventEntry() {
    const { EventArray, setEventArray, startEditing } = useContext(AppContext);

    function handleRemove(id) {
        const updatedArray = EventArray.filter((event) => event.id !== id);
        setEventArray(updatedArray);
        localStorage.setItem("EventArray", JSON.stringify(updatedArray));
    }

    if (EventArray.length === 0) {
        return <div className="font-bold">No entry yet</div>;
    }

    return (
        <div className="border-teal-800 border-2 rounded-md p-5 mb-2">
            <h1 className="pb-4 font-bold">History</h1>
            <div className="lg:grid lg:grid-cols-2 gap-3 ">
                {EventArray.map((event) => (
                    <div key={event.id} id={event.id} className="text-white max-lg:pb-3">
                        <div className="flex align-baseline justify-between bg-teal-800 p-3 rounded-md">
                            <div>
                                <p className="pb-2 mr-10 md:mr-20 max-w-[960px]">
                                    {event.text}
                                </p>
                                <div className="text-xs text-gray-300">
                                    <p>{event.date}</p>
                                    <p>{event.category}</p>
                                </div>
                            </div>
                            <p className="ml-auto mr-6 whitespace-nowrap text-2xl self-center">
                                {event.money} €
                            </p>
                            <div className="flex items-center gap-2 justify-center text-3xl">
                                <CiEdit
                                    className="hover:cursor-pointer hover:text-gray-700"
                                    onClick={() => startEditing(event.id)}
                                />
                                <CiCircleRemove
                                    className="hover:cursor-pointer hover:text-red-500"
                                    onClick={() => handleRemove(event.id)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventEntry;
