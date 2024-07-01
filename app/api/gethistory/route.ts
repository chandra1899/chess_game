import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import BoardState from '@/models/boardState'
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
        let history=await BoardState.find({roomName : parsedInput.data.roomName})
        return NextResponse.json({history},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}