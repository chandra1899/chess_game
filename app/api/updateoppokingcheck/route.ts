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
    checkWhiteToBlack:number
    checkBlackToWhite:number
    save:()=>any
}

export async function POST(req:Request){
    try {
        const {roomName,isWhiteSide}=await req.json()
        // console.log('in setdisconnected',roomName,email)
        await connectMongoDB()
        let existingGameInstance:gametype | null=await Game.findOne({roomName})
        if(existingGameInstance){
            if(isWhiteSide){
                existingGameInstance.checkWhiteToBlack=existingGameInstance.checkWhiteToBlack+1
            }else{
                existingGameInstance.checkBlackToWhite=existingGameInstance.checkBlackToWhite+1
            }
            await existingGameInstance.save()
        }
       
        return NextResponse.json({existingGameInstance},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}