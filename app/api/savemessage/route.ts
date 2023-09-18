import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Message from '@/models/message'

export async function POST(req:Request){
    try {
        const {roomName,value,isWhiteSide}=await req.json()
        // console.log(roomName,value,isWhiteSide)
        await connectMongoDB()
        let newMessage=await Message.create({
            roomName,value,isWhiteSide
        })
        return NextResponse.json({newMessage},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}