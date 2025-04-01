import { APIAuthenticateResponse } from "@/app/repositories/api/responses/APIAuthenticateResponse";
import { APIAuthenticateParameters } from "@/app/repositories/api/parameters/APIAuthenticateParameters";

import { AuthenticationError } from "@/app/errors/AuthenticationError";

export default async function authenticate({ apiAuthenticateParameters }: { apiAuthenticateParameters: APIAuthenticateParameters }): Promise<APIAuthenticateResponse> {
    let key: string = "";

    await fetch("/api/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(apiAuthenticateParameters.user)
    })
        .then((response) => {
            if (!response.ok) {
                throw new AuthenticationError(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        })
        .then((response) => {

            // TO DO: Implement the logic to check if the response contains the token

            key = response.token;
        })
        .catch((error) => {
            if (error instanceof AuthenticationError) {
                throw error;
            }

            console.error("Error fetching training sessions:", error.message);
        });

    const apiAuthenticateResponse: APIAuthenticateResponse = {
        key
    }

    return apiAuthenticateResponse;
}