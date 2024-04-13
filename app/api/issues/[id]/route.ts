import prisma from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, content) {
    try {
        const { id } = content.params; // Retrieve the id parameter from the request content
        var { status } = await req.json(); // Retrieve the status from the request body
        if(status.toUpperCase() === "IN PROGRESS")
            status = "IN_PROGRESS";
        // Update the status of the issue with the given ID
        const updatedIssue = await prisma.issue.update({
            where: { id: parseInt(id) }, // Ensure id is parsed as an integer
            data: { status : status.toUpperCase()},
        });

        return NextResponse.json(updatedIssue, { status: 200 });
    } catch (error) {
        console.error('Error updating issue status:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
