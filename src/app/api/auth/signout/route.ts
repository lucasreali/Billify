import { signOut } from "@/auth";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {

    try {
        await signOut();

        return NextResponse.json(
            { message: "Logout successful" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 401 }
        );
    }
}