import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const paramsSchema = z.object({
    id: z.string().cuid({ message: 'Invalid client ID' }),
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

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const validatedParams = paramsSchema.safeParse(params);

        if (!validatedParams.success) {
            return NextResponse.json(
                { errors: validatedParams.error.format() },
                { status: 400 }
            );
        }

        const { id } = validatedParams.data;

        const client = await prisma.client.findUnique({
            where: { id },
        });

        if (!client) {
            return NextResponse.json(
                { error: 'Client not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ client });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error fetching client' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Validate parameters
        const validatedParams = paramsSchema.safeParse(params);

        if (!validatedParams.success) {
            return NextResponse.json(
                { errors: validatedParams.error.format() },
                { status: 400 }
            );
        }

        const { id } = validatedParams.data;

        const clientExists = await prisma.client.findUnique({
            where: { id },
        });

        if (!clientExists) {
            return NextResponse.json(
                { error: 'Client not found' },
                { status: 404 }
            );
        }

        const body = await request.json();

        const result = clientPatchSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { errors: result.error.format() },
                { status: 400 }
            );
        }

        const updatedClient = await prisma.client.update({
            where: { id },
            data: result.data,
        });

        return NextResponse.json({ client: updatedClient });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error updating client' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const validatedParams = paramsSchema.safeParse(params);

        if (!validatedParams.success) {
            return NextResponse.json(
                { errors: validatedParams.error.format() },
                { status: 400 }
            );
        }

        const { id } = validatedParams.data;

        const clientExists = await prisma.client.findUnique({
            where: { id },
        });

        if (!clientExists) {
            return NextResponse.json(
                { error: 'Client not found' },
                { status: 404 }
            );
        }

        await prisma.client.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: 'Client successfully deleted' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Error deleting client' },
            { status: 500 }
        );
    }
}
