import { isBlack,isWhite } from "../checkForColor"
import { isOkToMove } from "../isOkToMove"
import { isValid } from "../isValid"

export const hightlightBlocksForPawns=(row:number,col:number,boardState:string[][],isWhiteSide:boolean,setHighlightedBox:any)=>{
    if(isWhiteSide){
        if(isValid(row-1,col) && boardState[row-1][col]===""){
            if(isValid(row-1,col) && isOkToMove(row,col,row-1,col,boardState,isWhiteSide))
            setHighlightedBox([[row-1,col]])
            if(row===6){
                if(isValid(row-2,col) && boardState[row-2][col]==="" && isOkToMove(row,col,row-2,col,boardState,isWhiteSide)){
                    setHighlightedBox((pre:any)=>[...pre,[row-2,col]])
                }
            }
        }
        if(isValid(row-1,col-1) && isBlack(row-1,col-1,boardState) && isOkToMove(row,col,row-1,col-1,boardState,isWhiteSide)){
            setHighlightedBox((pre:any)=>{return [...pre,[row-1,col-1]]})
        }
        if( isValid(row-1,col+1) && isBlack(row-1,col+1,boardState) && isOkToMove(row,col,row-1,col+1,boardState,isWhiteSide)){
            setHighlightedBox((pre:any)=>{return [...pre,[row-1,col+1]]})
        }
    }
    else{
        if(isValid(row+1,col) && boardState[row+1][col]===""){
            if(isValid(row+1,col) && isOkToMove(row,col,row+1,col,boardState,isWhiteSide))
            setHighlightedBox([[row+1,col]])
            if(row===1){
                if(isValid(row+2,col) && boardState[row+2][col]==="" && isOkToMove(row,col,row+2,col,boardState,isWhiteSide)){
                    setHighlightedBox((pre:any)=>[...pre,[row+2,col]])
                }
            }
        }
        if(isValid(row+1,col+1) && isWhite(row+1,col+1,boardState) && isOkToMove(row,col,row+1,col+1,boardState,isWhiteSide)){
            setHighlightedBox((pre:any)=>{return [...pre,[row+1,col+1]]})
        }
        if( isValid(row+1,col-1) && isWhite(row+1,col-1,boardState) && isOkToMove(row,col,row+1,col-1,boardState,isWhiteSide)){
            setHighlightedBox((pre:any)=>{return [...pre,[row+1,col-1]]})
        }
    } 
}

export const getWhitePawnsIndex=(newBoardState:string[][])=>{
    let Indexs=[];
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(newBoardState[i][j]==='♙'){
                Indexs.push([i,j])
            }
        }
    }
    return Indexs;
}

export const getBlackPawnsIndex=(newBoardState:string[][])=>{
    let Indexs=[];
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(newBoardState[i][j]==='♟︎'){
                Indexs.push([i,j])
            }
        }
    }
    return Indexs;
}

export const attackBlocksForPawns=(row:number,col:number,fromWhiteSide:boolean,newBoardState:string[][])=>{
    if(fromWhiteSide){
        if(isValid(row-1,col-1) && newBoardState[row-1][col-1]==="♚"){
            return true
        }
        if(isValid(row-1,col+1) && newBoardState[row-1][col+1]==="♚"){
            return true
        }
        return false
    }
    else{
        if(isValid(row+1,col+1) && newBoardState[row+1][col+1]==="♔"){
            return true
        }
        if(isValid(row+1,col-1) && newBoardState[row+1][col-1]==="♔"){
            return true
        }
        return false
    }
  
}

const checkPawnHasMove=(row:number,col:number,newboard:string[][],isWhiteSide:boolean)=>{
    if(isWhiteSide){
        if(isValid(row-1,col) && newboard[row-1][col]===""){
            if(isValid(row-1,col) && isOkToMove(row,col,row-1,col,newboard,isWhiteSide))
            return true
            if(row===6){
                if(isValid(row-2,col) && newboard[row-2][col]==="" && isOkToMove(row,col,row-2,col,newboard,isWhiteSide)){
                    return true
                }
            }
        }
        if(isValid(row-1,col-1) && isBlack(row-1,col-1,newboard) && isOkToMove(row,col,row-1,col-1,newboard,isWhiteSide)){
            return true
        }
        if( isValid(row-1,col+1) && isBlack(row-1,col+1,newboard) && isOkToMove(row,col,row-1,col+1,newboard,isWhiteSide)){
            return true
        }
    }
    else{
        if(isValid(row+1,col) && newboard[row+1][col]===""){
            if(isValid(row+1,col) && isOkToMove(row,col,row+1,col,newboard,isWhiteSide))
            return true
            if(row===1){
                if(isValid(row+2,col) && newboard[row+2][col]==="" && isOkToMove(row,col,row+2,col,newboard,isWhiteSide)){
                    return true
                }
            }
        }
        if(isValid(row+1,col+1) && isWhite(row+1,col+1,newboard) && isOkToMove(row,col,row+1,col+1,newboard,isWhiteSide)){
            return true
        }
        if( isValid(row+1,col-1) && isWhite(row+1,col-1,newboard) && isOkToMove(row,col,row+1,col-1,newboard,isWhiteSide)){
            return true
        }
    } 
    return false
}

export const checkOppoPawnsHasMove=(newboard:string[][],isWhiteSide:boolean)=>{
     //for pawns
     let IndexsPawns
     if(!isWhiteSide){
         IndexsPawns=getWhitePawnsIndex(newboard)
     }else{
         IndexsPawns=getBlackPawnsIndex(newboard)
     }
    for(let i=0;i<IndexsPawns.length;i++) {
     if(checkPawnHasMove(IndexsPawns[i][0],IndexsPawns[i][1],newboard,!isWhiteSide)){
        // console.log('true from pawn');
        
        return true;
     }
    }
    return false
}