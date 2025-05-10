import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const paramsSchema = z.object({
    userId: z.string().cuid({ message: 'Invalid user ID' }),
});

export const GET = async (
    request: NextRequest,
    { params }: { params: { userId: string } }
) => {
    try {
        const validatedParams = paramsSchema.safeParse(params);

        if (!validatedParams.success) {
            return NextResponse.json(
                { errors: validatedParams.error.format() },
                { status: 400 }
            );
        }

        const { userId } = validatedParams.data;

        const clients = await prisma.client.findMany({
            where: { userId },
        });

        return NextResponse.json({ clients });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch clients' },
            { status: 500 }
        );
    }
};
