import { checkOurKingCheckmate } from "./checkOurKingCheckmate"

export const isOkToMove=(rowFrom:number,colFrom:number,rowTO:number,colTO:number,boardState:[[string]],isWhiteSide:boolean)=>{
    let newFutureBoard=boardState.map(innerArray => [...innerArray])
    newFutureBoard[rowTO][colTO]=boardState[rowFrom][colFrom]
    newFutureBoard[rowFrom][colFrom]=""
    return !checkOurKingCheckmate(newFutureBoard,isWhiteSide)
}