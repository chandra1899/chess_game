import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Game from '@/models/game'

export async function POST(req:Request){
    try {
        const {_id}=await req.json()
        // console.log(roomName)
        await connectMongoDB()
        await Game.findByIdAndDelete(_id)
        return NextResponse.json({},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}