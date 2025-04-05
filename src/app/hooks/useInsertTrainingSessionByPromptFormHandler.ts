import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/app/repositories/store";

import { APIIInsertTrainingSessionByPromptParameters } from "@/app/repositories/api/parameters/APIInsertTrainingSessionByPromptParameters";
import { APIIInsertTrainingSessionByPromptResponse } from "@/app/repositories/api/responses/APIIInsertTrainingSessionByPromptResponse";
import insertTrainingSessionByPrompt from "@/app/repositories/api/insertTrainingSessionByPrompt";
import { addTrainingSession } from "@/app/repositories/redux/trainingSessions/slice";

export default function useInsertTrainingSessionByPromptFormHandler() {
    const dispatch = useDispatch();
    const key: string | undefined = useSelector((state: RootState) => state.authentication.key);

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

        if (key === undefined) {
            return;
        }

        const apiIInsertTrainingSessionByPromptParameters: APIIInsertTrainingSessionByPromptParameters = {
            key,
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