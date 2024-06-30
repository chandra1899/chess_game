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
        const {roomName,isWhiteSide}=await req.json()
        await connectMongoDB()
        let existingGameInstance:gametype | null=await Game.findOne({roomName})
        if(existingGameInstance){
            existingGameInstance.gameStatus='gameOver'
            existingGameInstance.whiteDisconnected=Date.now()
            existingGameInstance.blackDisconnected=Date.now()
            if(isWhiteSide){
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