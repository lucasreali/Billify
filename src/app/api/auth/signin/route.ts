import { signIn } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json(
            { error: "Email and password are required" },
            { status: 400 }
        );
    }

    try {
        await signIn('credentials', { email, password, redirect: false });

        return NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 401 }
        );
    }    

} 