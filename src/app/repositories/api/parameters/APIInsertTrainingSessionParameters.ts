import { TrainingSession } from "@/app/entities/TrainingSession"

export interface APIInsertTrainingSessionParameters {
    key: string,
    trainingSession: TrainingSession
}