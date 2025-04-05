import { TrainingSession } from "@/app/entities/TrainingSession";
import { APIIInsertTrainingSessionByPromptParameters } from "./parameters/APIInsertTrainingSessionByPromptParameters";
import { APIIInsertTrainingSessionByPromptResponse } from "./responses/APIIInsertTrainingSessionByPromptResponse";

export default async function insertTrainingSessionByPrompt({ apiIInsertTrainingSessionByPromptParameters }:
    { apiIInsertTrainingSessionByPromptParameters: APIIInsertTrainingSessionByPromptParameters }): Promise<APIIInsertTrainingSessionByPromptResponse> {
    let trainingSession: TrainingSession | undefined = undefined;

    await fetch("/api/insertTrainingSessionByPrompt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiIInsertTrainingSessionByPromptParameters.key}`,
        },
        body: JSON.stringify({"prompt": apiIInsertTrainingSessionByPromptParameters.prompt})
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

    const apiGeminiResponse: APIIInsertTrainingSessionByPromptResponse = {
        trainingSession
    }

    return apiGeminiResponse;
}