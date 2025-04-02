import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "@/app/entities/User";

const SECRET_KEY = "secret_key"; 

const customer: User = {
    username: "scobalit.desio",
    password: "password", 
};

export async function POST(req: Request): Promise<NextResponse>  {
    const { username, password } = await req.json();

    if (!customer || customer.username !== username) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = password === customer.password //await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ username: customer.username }, SECRET_KEY, { expiresIn: "1h" });

    return NextResponse.json({ token }); 
}