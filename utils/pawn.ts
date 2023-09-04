import { useRecoilValue, useSetRecoilState } from "recoil"
import { highlightedArray } from "@/store/atoms/highlight"
import { board } from "@/store/atoms/board"
import { Valid } from "@/store/atoms/valid"

const setHighlightedBox=useSetRecoilState(highlightedArray)
const boardState=useRecoilValue(board)
const isValid=useRecoilValue(Valid)

export const PawnValidMove=(row:number,col:number)=>{
    setHighlightedBox([[]])
            
    if(boardState[row-1][col]===""){
        if(isValid(row-1,col))
        setHighlightedBox([[row-1,col]])
        if(row===6){
            if(isValid(row-1,col) && boardState[row-2][col]===""){
                setHighlightedBox((pre)=>[...pre,[row-2,col]])
            }
        }
    }
    if(isValid(row-1,col) && isBlack(row-1,col-1)){
        setHighlightedBox((pre)=>{return [...pre,[row-1,col-1]]})
    }
    if( isValid(row-1,col) && isBlack(row-1,col+1)){
        setHighlightedBox((pre)=>{return [...pre,[row-1,col+1]]})
    }
}