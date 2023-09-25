import { isValid } from "../isValid";
import { isBlack,isWhite } from "../checkForColor";
import { isOkToMove } from "../isOkToMove";

export const hightlightBlocksForKing=(row:number,col:number,boardState:string[][],isWhiteSide:boolean,setHighlightedBox:any)=>{
    const newRow=[-1,0,1]
    const newCol=[-1,0,1]
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(!(newRow[i]===0 && newCol[j]===0) && isValid(row+newRow[i],col+newCol[j]) && ((isWhiteSide && !isWhite(row+newRow[i],col+newCol[j],boardState)) || (!isWhiteSide && !isBlack(row+newRow[i],col+newCol[j],boardState))) && isOkToMove(row,col,row+newRow[i],col+newCol[j],boardState,isWhiteSide)){  
                setHighlightedBox((pre:any)=>[...pre,[row+newRow[i],col+newCol[j]]]);
            }
        }
    }
}

export const attackBlocksForKing=(row:number,col:number,fromWhiteSide:boolean,newBoardState:string[][])=>{
    const newRow=[-1,0,1]
    const newCol=[-1,0,1]
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(!(newRow[i]===0 && newCol[j]===0) && isValid(row+newRow[i],col+newCol[j]) && ((fromWhiteSide && newBoardState[row+newRow[i]][col+newCol[j]]==='♚') || (!fromWhiteSide && newBoardState[row+newRow[i]][col+newCol[j]]==='♔'))){  
                return true
            }
        }
    }
   return false
} 

const checkBishopsHasMove=(row:number,col:number,isWhiteSide:boolean,newBoard:string[][])=>{
    const newRow=[-1,0,1]
    const newCol=[-1,0,1]
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(!(newRow[i]===0 && newCol[j]===0) && isValid(row+newRow[i],col+newCol[j]) && ((isWhiteSide && !isWhite(row+newRow[i],col+newCol[j],newBoard)) || (!isWhiteSide && !isBlack(row+newRow[i],col+newCol[j],newBoard))) && isOkToMove(row,col,row+newRow[i],col+newCol[j],newBoard,isWhiteSide)){  
                return true
            }
        }
    }
    return false
}

export const checkOppoKingHasMove=(newboard:string[][],isWhiteSide:boolean)=>{
     //for King
     let IndexsforKing
     for(let i=0;i<8;i++){
         for(let j=0;j<8;j++){
             if((!isWhiteSide && newboard[i][j]==='♔') || (isWhiteSide && newboard[i][j]==='♚')){
                 IndexsforKing=[i,j]
             }
         }
    }
    if(IndexsforKing!==undefined && checkBishopsHasMove(IndexsforKing[0],IndexsforKing[1],!isWhiteSide,newboard)){
        // console.log('true from king');
        return true;
    }
    return false
}