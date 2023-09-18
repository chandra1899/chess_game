import { isValid } from "../isValid";
import { isBlack,isWhite } from "../checkForColor";
import { isOkToMove } from "../isOkToMove";

export const hightlightBlocksForRook=(row:number,col:number,boardState:string[][],isWhiteSide:boolean,setHighlightedBox:any)=>{
    //1st side
    let newRow1=row-1;
    let newCol1=col;
    while(isValid(newRow1,newCol1) && boardState[newRow1][newCol1]==="" ){
        if(!isOkToMove(row,col,newRow1,newCol1,boardState,isWhiteSide)){
            newRow1--
            continue
        }
        setHighlightedBox((pre:any)=>[...pre,[newRow1,newCol1]]);
        newRow1--
    }
    if(isValid(newRow1,newCol1) && ((isWhiteSide && isBlack(newRow1,newCol1,boardState)) || (!isWhiteSide && isWhite(newRow1,newCol1,boardState))) && isOkToMove(row,col,newRow1,newCol1,boardState,isWhiteSide)){
        setHighlightedBox((pre:any)=>[...pre,[newRow1,newCol1]]);
    }
    //2st side
    let newRow2=row+1;
    let newCol2=col;
    while(isValid(newRow2,newCol2) && boardState[newRow2][newCol2]===""){
        if(!isOkToMove(row,col,newRow2,newCol2,boardState,isWhiteSide)){
            newRow2++
            continue
        }
        // console.log('hello2');
        setHighlightedBox((pre:any)=>[...pre,[newRow2,newCol2]]);
        newRow2++
    }
    if(isValid(newRow2,newCol2) && ((isWhiteSide && isBlack(newRow2,newCol2,boardState)) || (!isWhiteSide && isWhite(newRow2,newCol2,boardState))) && isOkToMove(row,col,newRow2,newCol2,boardState,isWhiteSide)){
        setHighlightedBox((pre:any)=>[...pre,[newRow2,newCol2]]);
    }
    //3rd side
    let newRow3=row;
    let newCol3=col-1;
    while(isValid(newRow3,newCol3) && boardState[newRow3][newCol3]===""){
        if(!isOkToMove(row,col,newRow3,newCol3,boardState,isWhiteSide)){
            newCol3--
            continue
        }
        // console.log('hello2');
        setHighlightedBox((pre:any)=>[...pre,[newRow3,newCol3]]);
        newCol3--
    }
    if(isValid(newRow3,newCol3) && ((isWhiteSide && isBlack(newRow3,newCol3,boardState)) || (!isWhiteSide && isWhite(newRow3,newCol3,boardState))) && isOkToMove(row,col,newRow3,newCol3,boardState,isWhiteSide)){
        setHighlightedBox((pre:any)=>[...pre,[newRow3,newCol3]]);
    }
    //4rth side
    let newRow4=row;
    let newCol4=col+1;
    while(isValid(newRow4,newCol4) && boardState[newRow4][newCol4]===""){
        // console.log('hello2');
        if(!isOkToMove(row,col,newRow4,newCol4,boardState,isWhiteSide)){
            newCol4++
            continue
        }
        setHighlightedBox((pre:any)=>[...pre,[newRow4,newCol4]]);
        newCol4++
    }
    if(isValid(newRow4,newCol4) && ((isWhiteSide && isBlack(newRow4,newCol4,boardState)) || (!isWhiteSide && isWhite(newRow4,newCol4,boardState))) && isOkToMove(row,col,newRow4,newCol4,boardState,isWhiteSide)){
        setHighlightedBox((pre:any)=>[...pre,[newRow4,newCol4]]);
    }
}

export const getWhiteRookIndex=(newBoardState:string[][])=>{
    let Indexs=[];
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(newBoardState[i][j]==='♖' || newBoardState[i][j]==='♕'){
                Indexs.push([i,j])
            }
        }
    }
    return Indexs;
}

export const getBlackRookIndex=(newBoardState:string[][])=>{
    let Indexs=[];
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(newBoardState[i][j]==='♜' || newBoardState[i][j]==='♛'){
                Indexs.push([i,j])
            }
        }
    }
    return Indexs;
}

export const attackBlocksForRooks=(row:number,col:number,fromWhiteSide:boolean,newBoardState:string[][])=>{
    //1st side
    let newRow1=row-1;
    let newCol1=col;
    while(isValid(newRow1,newCol1) && newBoardState[newRow1][newCol1]===""){
        newRow1--
    }
    if(isValid(newRow1,newCol1) && ((fromWhiteSide && newBoardState[newRow1][newCol1]==='♚') || (!fromWhiteSide && newBoardState[newRow1][newCol1]==='♔'))){
       return true
    }
    //2st side
    let newRow2=row+1;
    let newCol2=col;
    while(isValid(newRow2,newCol2) && newBoardState[newRow2][newCol2]===""){
        newRow2++
    }
    if(isValid(newRow2,newCol2) && ((fromWhiteSide && newBoardState[newRow2][newCol2]==='♚') || (!fromWhiteSide && newBoardState[newRow2][newCol2]==='♔'))){
       return true
    }
    //3rd side
    let newRow3=row;
    let newCol3=col-1;
    while(isValid(newRow3,newCol3) && newBoardState[newRow3][newCol3]===""){
        newCol3--
    }
    if(isValid(newRow3,newCol3) && ((fromWhiteSide && newBoardState[newRow3][newCol3]==='♚') || (!fromWhiteSide && newBoardState[newRow3][newCol3]==='♔'))){
       return true
    }
    //4rth side
    let newRow4=row;
    let newCol4=col+1;
    while(isValid(newRow4,newCol4) && newBoardState[newRow4][newCol4]===""){
        newCol4++
    }
    if(isValid(newRow4,newCol4) && ((fromWhiteSide && newBoardState[newRow4][newCol4]==='♚') || (!fromWhiteSide && newBoardState[newRow4][newCol4]==='♔'))){
       return true
    }
    return false;
}