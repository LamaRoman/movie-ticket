import prisma from '../lib/prisma.js'
export async function getProfile(req, res) {

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            select: { id: true, name: true, email: true }
        })

        res.status(200).json({ user })
    } catch (error) {
        next(error)
    }
}

export async function uploadProfilePicture(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' })
        }
        const user = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                profileImage: req.file.path
            },
            select: { id: true, name: true, email: true, profileImage: true }

        })
        res.status(200).json({ user })
    } catch (error) {
        next(error)
    }
}