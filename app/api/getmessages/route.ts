import {NextResponse } from 'next/server'
import {NextApiRequest } from 'next'
import { connectMongoDB } from '@/config/mongoose'
import bcrypt from 'bcryptjs'
import User from '@/models/user'
import Message from '@/models/message'

export async function POST(req:Request){
    try {
        const {roomName}=await req.json()
        // console.log(roomName)
        await connectMongoDB()
        let messages=await Message.find({roomName})
        return NextResponse.json({messages},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}