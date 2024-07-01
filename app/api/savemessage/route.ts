import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Message from '@/models/message'
import { z } from "zod"

const inputTypes = z.object({
    value : z.string(),
    roomName : z.string(),
    isWhiteSide : z.boolean()
})

export async function POST(req:Request){
    try {
        const body = await req.json()
        const parsedInput = inputTypes.safeParse(body)
        if(!parsedInput.success){
            return NextResponse.json({message:parsedInput.error},{status:411})
        }
        
        await connectMongoDB()
        let newMessage=await Message.create({
            roomName : parsedInput.data.roomName,
            value : parsedInput.data.value,
            isWhiteSide : parsedInput.data.isWhiteSide
        })
        return NextResponse.json({newMessage},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}