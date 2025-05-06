import { prisma } from '@/lib/prisma';
import { hashSync } from 'bcrypt-ts';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
    const { name, email, password, confirmPassword } = await request.json();

    if (!name || !email || !password || !confirmPassword) {
        return NextResponse.json(
            { error: 'All fields are required' },
            { status: 400 }
        );
    }

    if (password !== confirmPassword) {
        return NextResponse.json(
            { error: 'Passwords do not match' },
            { status: 400 }
        );
    }

    if (password.length < 6) {
        return NextResponse.json(
            { error: 'Password must be at least 6 characters' },
            { status: 400 }
        );
    }

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (user) {
        return NextResponse.json(
            { error: 'User already exists' },
            { status: 400 }
        );
    }

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashSync(password),
            },
        });
        return NextResponse.json(
            { message: 'User registered successfully' },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'An error occurred while registering the user' },
            { status: 500 }
        );
    }
};
