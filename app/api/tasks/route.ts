import { db } from "@/lib/db";

export async function GET() {
    const result = await db.query(
        "SELECT * FROM tasks ORDER BY created_at DESC"
    );

    return Response.json(result.rows);
}

export async function POST(request: Request) {
    const body = await request.json();

    const result = await db.query(
        `
    	INSERT INTO tasks (title, description, status)
    	VALUES ($1, $2, $3)
    	RETURNING *
    	`,
        [body.title, body.description, body.status ?? "active"]
    );

    return Response.json(result.rows[0], { status: 201 });
}

export async function DELETE(request: Request) {
    const body = await request.json();

    const result = await db.query(
        `
		DELETE FROM tasks WHERE id = $1
        RETURNING *
		`,
        [body.id]
    );

    if (result.rowCount === 0) {
        return Response.json({ error: "Task not found" }, { status: 404 });
    }

    return Response.json(result.rows[0]);
}
