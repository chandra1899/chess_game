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
        const {roomName,email}=await req.json()
        console.log('in setdisconnected',roomName,email)
        await connectMongoDB()
        let existingGameInstance:gametype | null=await Game.findOne({roomName})
        if(existingGameInstance){
            if(email===existingGameInstance.white){
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