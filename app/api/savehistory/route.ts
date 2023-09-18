import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import BoardState from '@/models/boardState';

export async function POST(req:Request){
    try {
        const {board,isWhiteSide,from,to,roomName}=await req.json()
        // console.log(board,isWhiteSide,from,to,roomName);
        
        await connectMongoDB()
        let createdhistory=await BoardState.create({
            board,isWhiteSide,from,to,roomName
        })
        return NextResponse.json({createdhistory},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}