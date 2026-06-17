import prisma from '../lib/prisma.js'

export async function register({name,email}){
    
    const userExist = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(userExist)
        throw new Error('Email already exists')

    const user = await prisma.user.create({
        data:{
            name,email
        }
    })
    return user
}