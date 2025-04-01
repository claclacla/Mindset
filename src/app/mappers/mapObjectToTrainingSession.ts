import { TrainingSession } from "@/app/entities/TrainingSession"

export default function mapObjectToTrainingSession(obj : any): TrainingSession {
    const trainingSession: TrainingSession = {
        id: obj.id,
        lastName: obj.lastName,
        firstName: obj.firstName,
        age: obj.age,
        distance: obj.distance
    }

    return trainingSession;
}