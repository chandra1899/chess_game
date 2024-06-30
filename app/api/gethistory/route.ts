import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import BoardState from '@/models/boardState'

export async function POST(req:Request){
    try {
        const {roomName}=await req.json()
        await connectMongoDB()
        let history=await BoardState.find({roomName})
        return NextResponse.json({history},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}