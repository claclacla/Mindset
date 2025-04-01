import { NextRequest, NextResponse } from "next/server";

import { TrainingSession } from "@/app/entities/TrainingSession";

type ApiResponse = TrainingSession[] | { error: string };

// TO DO: Add the logic to check the autorization key

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse>> {
    if (!req.headers.get("Authorization")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const trainingSessions: TrainingSession[] = [
        { id: 1, lastName: 'Snow', firstName: 'Pierre', age: 22, distance: 72 },
        { id: 2, lastName: 'Smith', firstName: 'Coraline', age: 31, distance: 104 },
        { id: 3, lastName: 'Altman', firstName: 'Aline', age: 45, distance: 25 },
    ];

    return NextResponse.json(trainingSessions);
}