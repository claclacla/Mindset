import { TrainingSession } from "../../entities/TrainingSession";

import { APIGetTrainingSessionParameters } from "@/app/repositories/api/parameters/APIGetTrainingSessionParameters";
import { APIGetTrainingSessionResponse } from "@/app/repositories/api/responses/APIGetTrainingSessionResponse";

export default async function getTrainingSessions({ apiGetTrainingSessionParameters }: { apiGetTrainingSessionParameters: APIGetTrainingSessionParameters }): Promise<APIGetTrainingSessionResponse> {
    let trainingSessions: TrainingSession[] = [];

    await fetch("/api/getTrainingSessions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiGetTrainingSessionParameters.key}`,
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

            // TO DO: Implement the logic to check if the response is a valid response
            // TO DO: Implement the logic to check if the response training sessions DTO are valid

            trainingSessions = response;
        })
        .catch((error) => {
            console.error("Error fetching training sessions:", error.message);
        });

    const apiGetTrainingSessionResponse: APIGetTrainingSessionResponse = {
        trainingSessions
    }

    return apiGetTrainingSessionResponse;
}