import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from 'firebase/auth';

import { APIInsertTrainingSessionParameters } from '@/app/repositories/api/parameters/APIInsertTrainingSessionParameters';
import { APIInsertTrainingSessionResponse } from '@/app/repositories/api/responses/APIInsertTrainingSessionResponse';
import insertTrainingSession from '@/app/repositories/api/insertTrainingSession';

import { addTrainingSession } from '@/app/repositories/redux/trainingSessions/slice';

import { initTrainingSession, trainingSessionHasEmptyField, TrainingSession } from '@/app/entities/TrainingSession';

export default function useInsertTrainingSessionFormHandler({ user }: { user: User }) {
    const dispatch = useDispatch();

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

        const idToken = await user.getIdToken();

        const apiInsertTrainingSessionParameters: APIInsertTrainingSessionParameters = {
            key: idToken,
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