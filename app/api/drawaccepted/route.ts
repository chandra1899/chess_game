import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Game from '@/models/game'

interface gametype {
    roomName:string
    white:string
    black:string
    gameStatus:string
    won:string
    whiteDisconnected:number
    blackDisconnected:number
    save:()=>any
}

export async function POST(req:Request){
    try {
        const {roomName}=await req.json()
        // console.log(roomName,email,isWhiteSide)
        await connectMongoDB()
        let existingGameInstance:gametype | null=await Game.findOne({roomName})
        if(existingGameInstance){
            existingGameInstance.gameStatus='draw'
            existingGameInstance.whiteDisconnected=Date.now()
            existingGameInstance.blackDisconnected=Date.now()
            await existingGameInstance.save()
        }
        return NextResponse.json({existingGameInstance},{status:200})
    } catch (error) {
        console.log('error in creating or checking instance of game',error);
        
        return NextResponse.json({message:'server error'},{status:500})
    }
}