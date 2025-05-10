import { signIn } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' }),
});

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();

        const result = loginSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { errors: result.error.format() },
                { status: 400 }
            );
        }

        const { email, password } = result.data;

        await signIn('credentials', { email, password, redirect: false });

        return NextResponse.json(
            { message: 'Login successful' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error }, { status: 401 });
    }
};
