import {css} from "@emotion/css";
import LargeDay from "../LargeDay/LargeDay";
import React, {useState, useEffect} from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

export default function SmallCalendar() {
    const [plantData, setPlantData] = useState([]);
    const [error, setError] = useState('');
    const [wateredPlants, setWateredPlants] = useState({});

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/plants');
                const data = await response.json();
                setPlantData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPlants();
    }, []);

    function getPlantForDay(dayOffset: number) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + dayOffset);
        const formattedDate = currentDate.toISOString().split('T')[0];

        return plantData.find(plant => plant.wateringDates.includes(formattedDate)) || null;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }

    return (
        <>
            <Header/>
            <div id='calendars' className={css`
                display: flex;
            `}>
                {[0, 1, 2, 3, 4, 5, 6].map(dayOffset => {
                    const plantForDay = getPlantForDay(dayOffset);
                    return (
                        <LargeDay
                            key={dayOffset}
                            day={dayOffset}
                            plant={plantForDay} // Pass the plant data or null if no plant matches
                        />
                    );
                })}
            </div>
            <Footer/>
        </>
    );
}
