import { connection } from "../../../prisma/db";

export default async function handler(request, respons) {
    // mengecek request method
    if (request.method !== "DELETE") {
        return (
            respons.status(401).json({
                success: false,
                message: "Request Method Not Allowed"
            })
        )
    }

    try {
        // request query
        const { id } = await request.query;

        const deleteNote = await connection.notes.delete({
            where: {
                id: parseInt(id)
            }
        })

        return (
            respons.status(201).json({
                success: true,
                message: "Berhasil Delete Data",
                query: deleteNote
            })
        )
    } catch (error) {
        respons.status(401).json({
            success: false,
            error: error.message
        })
    }
}