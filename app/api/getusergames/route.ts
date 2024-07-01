import {NextResponse } from 'next/server'
import { connectMongoDB } from '@/config/mongoose'
import Game from '@/models/game'
import { z } from "zod"

const inputTypes = z.object({
    email : z.string().email()
})

export async function POST(req:Request){
    try {
        const body = await req.json()
        const parsedInput = inputTypes.safeParse(body)
        if(!parsedInput.success){
            return NextResponse.json({message:parsedInput.error},{status:411})
        }
        
        await connectMongoDB()
        let games=await Game.find({$or: [{ white: parsedInput.data.email },{ black: parsedInput.data.email },],}).sort('-createdAt')
        return NextResponse.json({games},{status:200})
    } catch (error) {
        return NextResponse.json({message:'server error'},{status:500})
    }
}