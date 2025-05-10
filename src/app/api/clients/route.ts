import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const clientSchema = z.object({
    userId: z.string().cuid({ message: 'Invalid user ID' }),
    name: z
        .string()
        .min(2, { message: 'Name must have at least 2 characters' }),
    email: z
        .string()
        .email({ message: 'Invalid email address' })
        .optional()
        .nullable(),
    phone: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
});

const clientPatchSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must have at least 2 characters' })
        .optional(),
    email: z
        .string()
        .email({ message: 'Invalid email address' })
        .optional()
        .nullable(),
    phone: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const result = clientSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { errors: result.error.format() },
                { status: 400 }
            );
        }

        const { userId, name, email, phone, address } = result.data;

        const client = await prisma.client.create({
            data: {
                userId,
                name,
                email,
                phone,
                address,
            },
        });

        return NextResponse.json({ client }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error creating client' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');

        if (userId) {
            const userIdSchema = z
                .string()
                .cuid({ message: 'Invalid user ID' });
            const validation = userIdSchema.safeParse(userId);

            if (!validation.success) {
                return NextResponse.json(
                    { errors: validation.error.format() },
                    { status: 400 }
                );
            }
        }

        const clients = await prisma.client.findMany({
            where: userId ? { userId } : undefined,
        });

        return NextResponse.json({ clients });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error fetching clients' },
            { status: 500 }
        );
    }
}
