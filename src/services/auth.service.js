import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'
export async function register({name,email,password}){

    if(!name || !email || !password){
        throw new Error("All fields required")
    }

    const hashPassword = await bcrypt.hash(password,12)
    
    const userExist = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(userExist)
        throw new Error('Email already exists')

    const user = await prisma.user.create({
        data:{
            name,email,password:hashPassword
        },
        select:{
            id:true,
            name:true,
            email:true,
        }
    })
    return user
}

export async function login({email,password}){
    const userExist = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if (!userExist){
        throw new Error("User does not exist")
    }

    const decryptPassword = await bcrypt.compare(password,userExist.password)

    if(!decryptPassword){
        throw new Error("Password or email is invalid")
    }

    const {password:_,...userWithOutPassword}=userExist

    return userWithOutPassword;
}