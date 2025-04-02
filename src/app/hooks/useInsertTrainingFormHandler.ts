import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/app/repositories/store';

import { APIInsertTrainingSessionParameters } from '@/app/repositories/api/parameters/APIInsertTrainingSessionParameters';
import { APIInsertTrainingSessionResponse } from '@/app/repositories/api/responses/APIInsertTrainingSessionResponse';
import insertTrainingSession from '@/app/repositories/api/insertTrainingSession';

import { addTrainingSession } from '@/app/repositories/redux/trainingSessions/slice';

import { initTrainingSession, trainingSessionHasEmptyField, TrainingSession } from '@/app/entities/TrainingSession';

export default function useInsertTrainingFormHandler() {
    const dispatch = useDispatch();

    const key: string | undefined = useSelector((state: RootState) => state.authentication.key);
    const [trainingSession, setTrainingSession] = useState<TrainingSession>(initTrainingSession());
    const [hasEmptyFieldsError, setHasEmptyFieldsError] = useState<boolean>(false);

    function onFormFieldChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setHasEmptyFieldsError(false);

        setTrainingSession((prevData: TrainingSession) => ({
            ...prevData,
            [name]: value
        }));
    };

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (trainingSessionHasEmptyField(trainingSession)) {
            setHasEmptyFieldsError(true);
            return;
        }

        if (key === undefined) {
            return;
        }

        const apiInsertTrainingSessionParameters: APIInsertTrainingSessionParameters = {
            key,
            trainingSession
        }

        const apiInsertTrainingSessionResponse: APIInsertTrainingSessionResponse = await insertTrainingSession({ apiInsertTrainingSessionParameters });
        dispatch(addTrainingSession(apiInsertTrainingSessionResponse.trainingSession));

        setTrainingSession(initTrainingSession());
    }

    return {
        hasEmptyFieldsError,
        trainingSession,
        onFormFieldChange,
        onSubmit
    }
}