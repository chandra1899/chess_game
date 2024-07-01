import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Game from '@/models/game'
import { z } from "zod"

const inputTypes = z.object({
    email : z.string().email(),
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
        let existingGameInstance = await Game.findOne({roomName : parsedInput.data.roomName})
        if(existingGameInstance){
            if(parsedInput.data.email===existingGameInstance.white){
                existingGameInstance.whiteDisconnected=Date.now()
            }else{
                existingGameInstance.blackDisconnected=Date.now()
            }
            await existingGameInstance.save()
        }
        return NextResponse.json({},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}