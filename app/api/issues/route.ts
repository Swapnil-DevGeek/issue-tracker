import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"

const createIssueSchema = z.object({
    title : z.string().min(1,'Title is required').max(255),
    description : z.string().min(1,'Description is required').max(255)
});

const updateIssueStatusSchema = z.object({
    status: z.enum(['Open', 'Closed', 'In Progress']), // Define the valid status options
});


export async function POST(req : NextRequest){
    const body = await req.json();
    const validation = createIssueSchema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.format(),{status : 400});

    const newIssue = await prisma.issue.create({
        data : {
            title : body.title,
            description : body.description
        }
    })
    return NextResponse.json(newIssue,{status: 201 });
}

export async function GET(req: NextRequest) {
    try {
        // Fetch all issues from the database
        const allIssues = await prisma.issue.findMany();

        // Return the fetched issues in the response
        return NextResponse.json(allIssues, { status: 200 });
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error fetching issues:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
