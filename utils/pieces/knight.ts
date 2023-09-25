import { isValid } from "../isValid"
import { isBlack,isWhite } from "../checkForColor"
import { isOkToMove } from "../isOkToMove"

export const hightlightBlocksForKnight=(row:number,col:number,boardState:string[][],isWhiteSide:boolean,setHighlightedBox:any)=>{
    let possiblilities=[[-1,-2],[-1,2],[1,-2],[1,2],[-2,-1],[-2,1],[2,-1],[2,1]]
    for(let i=0;i<possiblilities.length;i++){
        if(isValid(row+possiblilities[i][0],col+possiblilities[i][1]) && ((isWhiteSide && !isWhite(row+possiblilities[i][0],col+possiblilities[i][1],boardState)) || (!isWhiteSide && !isBlack(row+possiblilities[i][0],col+possiblilities[i][1],boardState))) && isOkToMove(row,col,row+possiblilities[i][0],col+possiblilities[i][1],boardState,isWhiteSide)){
            setHighlightedBox((pre:any)=>[...pre,[row+possiblilities[i][0],col+possiblilities[i][1]]])
        }
    }
}

export const getWhiteKnightIndex=(newBoardState:string[][])=>{
    let Indexs=[];
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(newBoardState[i][j]==='♘'){
                Indexs.push([i,j])
            }
        }
    }
    return Indexs;
}
export const getBlackKnightIndex=(newBoardState:string[][])=>{
    let Indexs=[];
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(newBoardState[i][j]==='♞'){
                Indexs.push([i,j])
            }
        }
    }
    return Indexs;
}

export const attackBlocksForKnight=(row:number,col:number,fromWhiteSide:boolean,newBoardState:string[][])=>{
    let possiblilities=[[-1,-2],[-1,2],[1,-2],[1,2],[-2,-1],[-2,1],[2,-1],[2,1]]

    for(let i=0;i<possiblilities.length;i++){
        if(isValid(row+possiblilities[i][0],col+possiblilities[i][1]) && ((fromWhiteSide && newBoardState[row+possiblilities[i][0]][col+possiblilities[i][1]]==='♚') || (!fromWhiteSide && newBoardState[row+possiblilities[i][0]][col+possiblilities[i][1]]==='♔'))){
            return true
        }
    }
    return false
}

const checkBishopsHasMove=(row:number,col:number,isWhiteSide:boolean,newBoard:string[][])=>{
    let possiblilities=[[-1,-2],[-1,2],[1,-2],[1,2],[-2,-1],[-2,1],[2,-1],[2,1]]
    for(let i=0;i<possiblilities.length;i++){
        if(isValid(row+possiblilities[i][0],col+possiblilities[i][1]) && ((isWhiteSide && !isWhite(row+possiblilities[i][0],col+possiblilities[i][1],newBoard)) || (!isWhiteSide && !isBlack(row+possiblilities[i][0],col+possiblilities[i][1],newBoard))) && isOkToMove(row,col,row+possiblilities[i][0],col+possiblilities[i][1],newBoard,isWhiteSide)){
            return true
        }
    }
    return false
}

export const checkOppoKnightsHasMove=(newboard:string[][],isWhiteSide:boolean)=>{
    //for Knights
    let IndexsforKnights
    if(!isWhiteSide){
        IndexsforKnights=getWhiteKnightIndex(newboard)
    }else{
        IndexsforKnights=getBlackKnightIndex(newboard)
    }
   for(let i=0;i<IndexsforKnights.length;i++) {
    if(checkBishopsHasMove(IndexsforKnights[i][0],IndexsforKnights[i][1],!isWhiteSide,newboard)){
        // console.log('true from knight');
        return true;
    }
   }
   return false
}