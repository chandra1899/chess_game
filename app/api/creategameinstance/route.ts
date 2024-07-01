import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Game from '@/models/game'
import { z } from "zod"

const inputTypes = z.object({
    email : z.string().email(),
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
        let existingGameInstance = await Game.findOne({roomName : parsedInput.data.roomName})
        if(existingGameInstance){
            if(existingGameInstance.gameStatus==='running'){
                if(parsedInput.data.isWhiteSide){
                    if((Date.now()-existingGameInstance.whiteDisconnected)>=600000){
                        existingGameInstance.gameStatus='gameOver'
                    }
                }else{
                    if(existingGameInstance.blackDisconnected===undefined){
                        existingGameInstance.black=parsedInput.data.email
                    }else if((Date.now()-existingGameInstance.blackDisconnected)>=600000){
                        existingGameInstance.gameStatus='gameOver'
                    }
                }
                if(existingGameInstance.gameStatus==='gameOver'){
                    if((Date.now()-existingGameInstance.whiteDisconnected)<(Date.now()-existingGameInstance.blackDisconnected)){
                        existingGameInstance.won='white'
                    }else{
                        existingGameInstance.won='black'
                    }
                }
                await existingGameInstance.save()
            }
        }else{
            existingGameInstance=await Game.create({
                white:parsedInput.data.email,
                roomName : parsedInput.data.roomName
            })
        }
        return NextResponse.json({existingGameInstance},{status:200})
    } catch (error) {
        console.log('error in creating or checking instance of game',error);
        return NextResponse.json({message:'server error'},{status:500})
    }
}