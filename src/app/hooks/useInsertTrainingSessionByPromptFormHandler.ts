import { useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "firebase/auth";

import { APIIInsertTrainingSessionByPromptParameters } from "@/app/repositories/api/parameters/APIInsertTrainingSessionByPromptParameters";
import { APIIInsertTrainingSessionByPromptResponse } from "@/app/repositories/api/responses/APIIInsertTrainingSessionByPromptResponse";
import insertTrainingSessionByPrompt from "@/app/repositories/api/insertTrainingSessionByPrompt";
import { addTrainingSession } from "@/app/repositories/redux/trainingSessions/slice";

export default function useInsertTrainingSessionByPromptFormHandler({ user }: { user: User }) {
    const dispatch = useDispatch();

    const [prompt, setPrompt] = useState<string>("");
    const [hasEmptyFieldsError, setHasEmptyFieldsError] = useState<boolean>(false);

    function onFormFieldChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setHasEmptyFieldsError(false);

        setPrompt(value);
    };

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (prompt === "") {
            setHasEmptyFieldsError(true);
            return;
        }

        const idToken = await user.getIdToken();

        const apiIInsertTrainingSessionByPromptParameters: APIIInsertTrainingSessionByPromptParameters = {
            key: idToken,
            prompt
        };

        const apiIInsertTrainingSessionByPromptResponse: APIIInsertTrainingSessionByPromptResponse = await insertTrainingSessionByPrompt({ apiIInsertTrainingSessionByPromptParameters });

        dispatch(addTrainingSession(apiIInsertTrainingSessionByPromptResponse.trainingSession));

        setPrompt("");
    }

    return {
        hasEmptyFieldsError,
        prompt,
        onFormFieldChange,
        onSubmit
    }
}