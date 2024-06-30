import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Game from '@/models/game'

export async function POST(req:Request){
    try {
        const {email}=await req.json()
        await connectMongoDB()
        let games=await Game.find({$or: [{ white: email },{ black: email },],}).sort('-createdAt')
        return NextResponse.json({games},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}