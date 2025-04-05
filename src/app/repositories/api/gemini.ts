import { APIGeminiParameters } from "./parameters/APIGeminiParameters";
import { APIGeminiResponse } from "./responses/APIGeminiResponse";

export default async function gemini({ apiGeminiParameters }:
    { apiGeminiParameters: APIGeminiParameters }): Promise<APIGeminiResponse> {
    let response: string = "";

    await fetch("/api/gemini", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiGeminiParameters.key}`,
        },
        body: JSON.stringify({"prompt": apiGeminiParameters.prompt})
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        })
        .then((apiResponse) => {
            response = apiResponse.data.trainingSession;
        })
        .catch((error) => {
            console.error("Error fetching training sessions:", error.message);
        });

    const apiGeminiResponse: APIGeminiResponse = {
        response
    }

    return apiGeminiResponse;
}