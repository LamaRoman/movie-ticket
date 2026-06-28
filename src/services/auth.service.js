import prisma from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js'
// Verify the refres token
export async function refresh(refreshToken){
    
    const decodedToken = verifyRefreshToken(refreshToken)

    const user = await prisma.user.findUnique({
        where:{id:decodedToken.id},
        select:{
            id:true,
            name:true,
            email:true,
            refreshToken:true
        }
    })
    if(user.refreshToken !== refreshToken){
        throw new AppError("Token does not match")
    }

    return generateAccessToken(user)
}
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

  return await prisma.$transaction(async(tx)=>{
    const user = await tx.user.create({
        data:{name,email,password:hashPassword},
        select:{
            id:true,
            name:true,
            email:true,
            role:true
        }
    })
    const accessToken = generateAccessToken(user)
    const refreshToken =generateRefreshToken(user)

    await tx.user.update({
        where:{id:user.id},
        data:{refreshToken}
    })
    return {accessToken,refreshToken,user}
   })
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

    // Generate both tokens using the found user
    const accessToken = generateAccessToken(userExist)
    const refreshToken = generateRefreshToken(userExist)

    // Step B - save refresh token to DB inside a transaction
    
    await prisma.$transaction([
        prisma.user.update({
            where:{id:userExist.id},
            data:{refreshToken}
        })
    ])

    const {password:_,...userWithOutPassword}=userExist

    return {accessToken,refreshToken,user:userWithOutPassword};
}

export async function logout(userId){
    await prisma.user.update({
        where:{id:userId},
        data:{refreshToken:null}
    })
    
}