import { TrainingSession } from "@/app/entities/TrainingSession";
import { APIInsertTrainingSessionParameters } from "./parameters/APIInsertTrainingSessionParameters";
import { APIInsertTrainingSessionResponse } from "./responses/APIInsertTrainingSessionResponse";

export default async function insertTrainingSession({ apiInsertTrainingSessionParameters }:
    { apiInsertTrainingSessionParameters: APIInsertTrainingSessionParameters }): Promise<APIInsertTrainingSessionResponse> {
    let trainingSession: TrainingSession | undefined = undefined;

    await fetch("/api/insertTrainingSession", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiInsertTrainingSessionParameters.key}`,
        },
        body: JSON.stringify(apiInsertTrainingSessionParameters.trainingSession)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        })
        .then((response) => {
            trainingSession = response.data.trainingSession;
        })
        .catch((error) => {
            console.error("Error fetching training sessions:", error.message);
        });

    const apiInsertTrainingSessionResponse: APIInsertTrainingSessionResponse = {
        trainingSession
    }

    return apiInsertTrainingSessionResponse;
}