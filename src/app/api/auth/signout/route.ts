import { signOut } from "@/auth";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {

    try {
        await signOut({redirect: false});

        return NextResponse.json(
            { message: "Logout successful" },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 401 }
        );
    }
}