import { connection } from "../../../prisma/db";

export default async function handler(request, respons) {

    if (request.method !== "PUT") {
        return (
            respons.status(401).json({
                success: false,
                message: "Request Method Not Allowed"
            })
        )
    }

    try {
        const { id } = await request.query

        const newData = await request.body

        const updateData = await connection.notes.update({
            where: {
                id: parseInt(id),
            },
            data: newData
        })

        return (
            respons.status(201).json({
                success: true,
                message: "Berhasil Update Data",
                query: updateData
            })
        )

    } catch (error) {
        respons.status(401).json({
            success: false,
            error: error.message
        })
    }
}