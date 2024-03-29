import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { CiCircleRemove } from "react-icons/ci";

function EventEntry() {
    const { EventArray, setEventArray } = useContext(AppContext);
    let RenderEvents;

    // Remove entry
    function handleRemove(id) {
        const updatedArray = EventArray.filter((event) => event.id !== id);
        setEventArray(updatedArray);
        localStorage.setItem("EventArray", JSON.stringify(updatedArray));
    }

    //Date
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const slicedYear = year.toString().slice(-2);
    const publishedDate = `${day}/${month}/${slicedYear}`

    // Render entry
    const renderEntry = (EventArray) => {
        if (EventArray.length > 0) {
            RenderEvents = EventArray.map((event) => (
                <div key={event.id} id={event.id} className=" text-white">
                    <div key={event.id} className=" pb-3">
                        <div className="flex align-baseline justify-between bg-teal-600 p-3 rounded-md ">
                            <div>
                                <p className="pb-2 mr-10 md:mr-20 max-w-[960px]">
                                    {event.text}
                                </p>
                                <div className="text-xs text-gray-300">
                                    <p>{publishedDate}</p>
                                    <p>{event.category}</p>
                                </div>
                            </div>
                            <p className=" ml-auto mr-6 whitespace-nowrap text-2xl self-center">
                                {event.money} €
                            </p>
                            <div className=" flex flex-col justify-center hover:cursor-pointer hover:text-red-500 text-3xl ">
                                <CiCircleRemove
                                    onClick={() => {
                                        handleRemove(event.id);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ));
        } else {
            RenderEvents = <div className="font-bold">No entry yet</div>;
        }
    };

    // Initial rendering
    renderEntry(EventArray);

    return (
        <div className="border-teal-600 border-2 rounded-md p-5 mb-2">
            <h1 className="pb-4 font-bold">History</h1>
            {RenderEvents}
        </div>
    );
}

export default EventEntry;
