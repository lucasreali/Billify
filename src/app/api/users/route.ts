import { prisma } from '@/lib/prisma';
import { hashSync } from 'bcrypt-ts';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const registerSchema = z
    .object({
        name: z
            .string()
            .min(2, { message: 'Name must have at least 2 characters' }),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters' })
            .max(20, { message: 'Password must be at most 20 characters' }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const result = registerSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { errors: result.error.format() },
                { status: 400 }
            );
        }

        const { name, email, password } = result.data;

        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        const hashedPassword = hashSync(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(
            { message: 'User created successfully', user: userWithoutPassword },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Error registering user' },
            { status: 500 }
        );
    }
}
