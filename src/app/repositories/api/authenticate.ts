import { User } from "@/app/entities/User";

export default async function authenticate({ username, password }: User) {
    let key: string | undefined = undefined;

    await fetch("/api/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        })
        .then((response) => {

            // TO DO: Implement the logic to check if the response contains the token
            
            key = response.token;
        })
        .catch((error) => {
            console.error("Error fetching training sessions:", error.message);
        });

    return key;
}