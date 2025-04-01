export interface TrainingSession {
    id?: number,
    lastName: string,
    firstName: string,
    age: number,
    distance: number
}

export function initTrainingSession() {
    return {
        lastName: "",
        firstName: "",
        age: 0,
        distance: 0
    };
}