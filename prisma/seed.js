// prisma/seed.js
import prisma from '../src/lib/prisma.js'
import bcrypt from 'bcrypt'


const users = [
    { name: 'Ram Sharma', email: 'ram@gmail.com', password: 'ram123' },
    { name: 'Hari Thapa', email: 'hari@gmail.com', password: 'hari123' },
    { name: 'Sita Rai', email: 'sita@gmail.com', password: 'sita123' },
    { name: 'Gita Karki', email: 'gita@gmail.com', password: 'gita123' },
    { name: 'Bikash Shrestha', email: 'bikash@gmail.com', password: 'bikash123' },
    { name: 'Anita Tamang', email: 'anita@gmail.com', password: 'anita123' },
    { name: 'Suresh Gurung', email: 'suresh@gmail.com', password: 'suresh123' },
    { name: 'Manita Lama', email: 'manita@gmail.com', password: 'manita123' },
    { name: 'Dipak Magar', email: 'dipak@gmail.com', password: 'dipak123' },
    { name: 'Kopila Rana', email: 'kopila@gmail.com', password: 'kopila123' },
]

async function main() {
    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 12)
        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashedPassword
            }
        })
    }
    console.log('Seeding complete')
}

main()
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })