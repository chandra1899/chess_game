import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Game from '@/models/game'
import { z } from "zod"

const inputTypes = z.object({
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
        let existingGameInstance = await Game.findOne({roomName : parsedInput.data.roomName
        })
        if(existingGameInstance){
            existingGameInstance.gameStatus='gameOver'
            existingGameInstance.whiteDisconnected=Date.now()
            existingGameInstance.blackDisconnected=Date.now()
            if(parsedInput.data.isWhiteSide){
                existingGameInstance.won='white'
            }else{
                existingGameInstance.won='black'
            }
            await existingGameInstance.save()
        }
        return NextResponse.json({existingGameInstance},{status:200})
    } catch (error) {
        console.log('error in creating or checking instance of game',error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}