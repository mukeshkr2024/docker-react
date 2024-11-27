import axios from "axios";
import React, { useState, useEffect, FormEvent } from "react";

interface SeenIndex {
    number: number;
}

interface Values {
    [key: string]: string;
}

const Fib: React.FC = () => {
    const [seenIndexes, setSeenIndexes] = useState<SeenIndex[]>([]);
    const [values, setValues] = useState<Values>({});
    const [index, setIndex] = useState<string>("");

    // Fetch the API URL from the environment variable (VITE_API_URL)
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

    console.log(apiUrl);


    // Fetch current values from Redis
    const fetchValues = async (): Promise<void> => {
        try {
            const response = await axios.get<Values>(`${apiUrl}/values/current`);
            setValues(response.data);
        } catch (err) {
            console.error("Error fetching values:", (err as Error).message);
        }
    };

    // Fetch all indexes from PostgreSQL
    const fetchIndexes = async (): Promise<void> => {
        try {
            const response = await axios.get<SeenIndex[]>(`${apiUrl}/values/all`);
            setSeenIndexes(response.data);
        } catch (err) {
            console.error("Error fetching indexes:", (err as Error).message);
        }
    };

    // Submit a new index
    const handleSubmit = async (event: FormEvent): Promise<void> => {
        event.preventDefault();

        if (!index || isNaN(Number(index))) {
            alert("Please enter a valid index!");
            return;
        }

        try {
            await axios.post(`${apiUrl}/values`, { index });
            setIndex(""); // Clear the input field
            fetchValues(); // Refresh values
            fetchIndexes(); // Refresh seen indexes
        } catch (err) {
            console.error("Error submitting index:", (err as Error).message);
        }
    };

    // Render seen indexes
    const renderSeenIndexes = (): string => {
        return seenIndexes?.map(({ number }) => number).join(", ");
    };

    // Render calculated values
    const renderValues = (): JSX.Element[] => {
        return Object.keys(values)?.map((key) => (
            <div key={key}>
                For index {key}, the value is {values[key]}
            </div>
        ));
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchValues();
        fetchIndexes();
    }, []);

    return (
        <div>
            <h1>Fibonacci Calculator</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter your index:</label>
                <input
                    type="text"
                    value={index}
                    onChange={(e) => setIndex(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>

            <h2>Indexes I have seen:</h2>
            <p>{renderSeenIndexes()}</p>

            <h2>Calculated Values:</h2>
            {renderValues()}
        </div>
    );
};

export default Fib;
