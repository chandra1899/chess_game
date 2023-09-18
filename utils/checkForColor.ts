const blackParts=["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜","♟︎"]
const whiteParts=["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖","♙"]

export const isBlack=(row:number,col:number,boardState:string[][])=>{
    // console.log(board[row][col]);
    
    return blackParts.includes(boardState[row][col])
}

export const isWhite=(row:number,col:number,boardState:string[][])=>{
    return whiteParts.includes(boardState[row][col])
}