import { connection } from "../../../prisma/db"

export default async function handler(request, respons) {

    if (request.method !== "POST") {
        return (
            respons.status(401).json({
                success: false,
                message: "Request Method Not Allowed"
            })
        )
    }

    try {
        const data = await request.body;

        // membuat createNote dengan memanggil variabel connection di db.js, memanggil schema di schema.prisma dan membuatnya
        const createNote = await connection.notes.create({
            data: data,
        })

        return (
            respons.status(201).json({
                success: true,
                query: createNote,
            })
        )

    } catch (error) {
        respons.status(401).json({
            success: false,
            error: error.message
        })
    }
}