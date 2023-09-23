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
        const {roomName,email,isWhiteSide}=await req.json()
        // console.log(roomName,email,isWhiteSide)
        await connectMongoDB()
        let existingGameInstance:gametype | null=await Game.findOne({roomName})
        if(existingGameInstance){
            if(existingGameInstance.gameStatus==='running'){
                if(isWhiteSide){
                    if((Date.now()-existingGameInstance.whiteDisconnected)>=600000){
                        existingGameInstance.gameStatus='gameOver'
                    }
                }else{
                    if(existingGameInstance.blackDisconnected===undefined){
                        existingGameInstance.black=email
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
                white:email,
                roomName
            })
        }
        return NextResponse.json({existingGameInstance},{status:200})
    } catch (error) {
        console.log('error in creating or checking instance of game',error);
        
        return NextResponse.json({message:'server error'},{status:500})
    }
}