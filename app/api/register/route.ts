import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import bcrypt from 'bcryptjs'
import User from '@/models/user'
import { z } from 'zod'

const inputTypes = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string(),
    confirmPassword : z.string()
})

export async function POST(req:Request){
    try {
        const body = await req.json()
        const parsedInput = inputTypes.safeParse(body)
        if(!parsedInput.success){
            return NextResponse.json({message:parsedInput.error},{status:411})
        }

        let exit = await User.findOne({email : parsedInput.data.email})
        if(exit) {
            return NextResponse.json({message : "user already exits"},{status:409})
        }

        const hashpassword=await bcrypt.hash(parsedInput.data.password,12)
        await connectMongoDB()
        await User.create({name : parsedInput.data.name,email : parsedInput.data.email,password:hashpassword})
        return NextResponse.json({message:'user registed'},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}