import { NextRequest, NextResponse } from "next/server";

import { TrainingSession } from "@/app/entities/TrainingSession";

import { getRandomNumber } from "@/app/types/number/getRandomNumber";

export async function POST(req: NextRequest) {
    const { firstName, lastName, age, distance } = await req.json();

    const trainingSession: TrainingSession = {
        firstName,
        lastName,
        age,
        distance
    };

    trainingSession.id = getRandomNumber(1, 10000);

    return NextResponse.json({ data: { trainingSession: trainingSession } }, { status: 200 });
}