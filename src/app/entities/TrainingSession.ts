export interface TrainingSession {
    id?: number,
    lastName: string,
    firstName: string,
    age: number,
    distance: number
}

export function initTrainingSession(): TrainingSession {
    return {
        lastName: "",
        firstName: "",
        age: 0,
        distance: 0
    };
}

export function trainingSessionHasEmptyField(trainingSession: TrainingSession): boolean {
    let hasEmptyField: boolean = false;

    if(trainingSession.lastName === "" || trainingSession.firstName === "") {
        hasEmptyField = true;
    }

    return hasEmptyField;
}