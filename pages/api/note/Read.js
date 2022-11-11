import { connection } from "../../../prisma/db";

export default async function handler(request, respons) {
    // mengecek request method
    if (request.method !== "GET") {
        return (
            respons.status(401).json({
                success: false,
                message: "Request Method Not Allowed"
            })
        )
    }

    try {
        const result = await connection.notes.findMany();

        return (
            respons.status(200).json({
                success: true,
                query: result
            })
        )

    } catch (error) {
        respons.status(401).json({
            success: false,
            error: error.message
        })
    }
}