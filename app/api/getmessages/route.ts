import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Message from '@/models/message'
import { z } from "zod"

const inputTypes = z.object({
    roomName : z.string()
})

export async function POST(req:Request){
    try {
        const body = await req.json()
        const parsedInput = inputTypes.safeParse(body)
        if(!parsedInput.success){
            return NextResponse.json({message:parsedInput.error},{status:411})
        }

        await connectMongoDB()
        let messages=await Message.find({roomName : parsedInput.data.roomName})
        return NextResponse.json({messages},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}