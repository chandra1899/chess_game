import {NextResponse } from 'next/server'
import {NextApiRequest } from 'next'
import { connectMongoDB } from '@/config/mongoose'
import bcrypt from 'bcryptjs'
import User from '@/models/user'

export async function POST(req:Request){
    try {
        const {name , email , password, confirmPassword}=await req.json()
        const hashpassword=await bcrypt.hash(password,12)
        await connectMongoDB()
        await User.create({name,email,password:hashpassword})
        return NextResponse.json({message:'user registed'},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}