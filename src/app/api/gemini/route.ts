import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs';
import { TrainingSession } from '@/app/entities/TrainingSession';
import { getRandomNumber } from '@/app/types/number/getRandomNumber';

import { GOOGLE } from "../../../../config.json";

// Load Google Cloud credentials
const credentials = JSON.parse(fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS!, 'utf-8'));

//console.log(credentials);

// Authenticate and get the access token
async function authenticate() {
    const auth = new google.auth.JWT(
        credentials.client_email,
        undefined,
        credentials.private_key,
        ['https://www.googleapis.com/auth/cloud-platform']
    );

    const authToken = await auth.authorize();
    return authToken.access_token;
}

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();

    // Prepare the prompt
    const apiPrompt = `Extract the following data in JSON format:\n\lastName (as 'lastName'), firstName (as 'firstName'), Age (as 'age'), and Distance (as 'distance')\n\nInput: ${prompt}\n\nOutput:`;
    console.log("API prompt: " + apiPrompt);

    try {
        // Authenticate to get access token
        const accessToken = await authenticate();

        // Call the Vertex AI API
        const res = await fetch(
            `https://us-central1-aiplatform.googleapis.com/v1/projects/${GOOGLE.PROJECT_ID}/locations/us-central1/publishers/google/models/gemini-1.5-pro-002:streamGenerateContent`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    contents: [ // 'contents' is an array
                        {
                            role: "user",
                            parts: [{ text: apiPrompt }] // 'parts' is an array of objects
                        }
                    ],
                    generation_config: { // Replaces 'parameters'
                        temperature: 0
                    }
                }),
            }
        );

        // Get the response from Vertex AI
        const data = await res.json();

        // Join the parts from the candidates and parse the response
        const responseParts = data.map((item: any) => item.candidates[0]?.content?.parts[0]?.text).join('');

        const cleanedResponse = responseParts.replace(/```json/g, '').replace(/```/g, '').trim();

        // Try to parse the JSON response
        let jsonResponse;

        try {
            jsonResponse = JSON.parse(cleanedResponse);
        } catch (parseError) {
            console.error('Failed to parse JSON:', parseError);
            jsonResponse = { error: 'Failed to parse the response into JSON' };
        }

        console.log('Parsed JSON Response:', JSON.stringify(jsonResponse, null, 2));

        const trainingSession: TrainingSession = {
            firstName: jsonResponse.firstName,
            lastName: jsonResponse.lastName,
            age: jsonResponse.age,
            distance: jsonResponse.distance
        };

        trainingSession.id = getRandomNumber(1, 10000);

        // Return the response data
        return NextResponse.json({ data: { trainingSession: trainingSession } }, { status: 200 });
    } catch (error) {
        console.error('Error in API call:', error);
        return NextResponse.json({ error: 'Failed to process the request' }, { status: 500 });
    }
}
