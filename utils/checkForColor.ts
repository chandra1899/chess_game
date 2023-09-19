const blackParts=["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜","♟︎"]
const whiteParts=["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖","♙"]

export const isBlack=(row:number,col:number,boardState:string[][])=>{
    console.log('boardState',boardState);
    // if(!boardState) return false;
    
    return blackParts.includes(boardState[row][col])
}

export const isWhite=(row:number,col:number,boardState:string[][])=>{
    console.log('boardState',boardState);
    return whiteParts.includes(boardState[row][col])
}