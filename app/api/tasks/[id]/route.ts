import { NextResponse } from "next/server";
import { db } from "@/lib/db";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
    try {
        const { id } = await params;
        const body = await request.json();

        const result = await db.query(
            `
            UPDATE tasks
            SET title = $1, description = $2, status = $3
            WHERE id = $4
            RETURNING *;
            `,
            [body.title, body.description, body.status, id]
        );

        if (result.rowCount === 0) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(result.rows[0]);
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
