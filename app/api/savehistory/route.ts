import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'

export async function POST(req:Request){
    try {
        const {board,isWhiteSide,from,to,roomName}=await req.json()
        console.log(board,isWhiteSide,from,to,roomName);
        
        await connectMongoDB()
        return NextResponse.json({message:'user registed'},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}