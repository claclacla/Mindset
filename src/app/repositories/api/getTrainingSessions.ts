import { TrainingSession } from "../../entities/TrainingSession";

export default async function getTrainingSessions({ key }: { key: string }) {
    let trainingSessions: TrainingSession[] = [];

    await fetch("/api/trainingSessions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${key}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Unauthorized - Please log in.");
                }

                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        })
        .then((response) => {
            trainingSessions = response;
        })
        .catch((error) => {
            console.error("Error fetching training sessions:", error.message);
        });

    return trainingSessions;
}