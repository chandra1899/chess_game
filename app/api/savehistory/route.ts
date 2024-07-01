import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import BoardState from '@/models/boardState';
import { z } from "zod"

const inputTypes = z.object({
    board : z.array(z.array(z.string())),
    isWhiteSide : z.boolean(),
    from : z.array(z.number()),
    to : z.array(z.number()),
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
        let createdhistory=await BoardState.create({
            board : parsedInput.data.board,isWhiteSide : parsedInput.data.isWhiteSide,from : parsedInput.data.from,to : parsedInput.data.to,roomName : parsedInput.data.roomName
        })
        return NextResponse.json({createdhistory},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}