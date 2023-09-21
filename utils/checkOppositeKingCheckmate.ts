import { getWhitePawnsIndex ,getBlackPawnsIndex ,attackBlocksForPawns} from "./pieces/pawn"
import { getWhiteRookIndex ,getBlackRookIndex ,attackBlocksForRooks} from "./pieces/rook"
import { getWhiteBishopIndex ,getBlackBishopIndex ,attackBlocksForBishops} from "./pieces/bishop"
import { getWhiteKnightIndex ,getBlackKnightIndex,attackBlocksForKnight} from "./pieces/knight"
import { attackBlocksForKing } from "./pieces/king"

export const checkOppositeKingCheckmate=(boardState:string[][],isWhiteSide:boolean)=>{
    //for pawns
    let IndexsPawns
    if(isWhiteSide){
        IndexsPawns=getWhitePawnsIndex(boardState)
    }else{
        IndexsPawns=getBlackPawnsIndex(boardState)
    }
   for(let i=0;i<IndexsPawns.length;i++) {
    if(attackBlocksForPawns(IndexsPawns[i][0],IndexsPawns[i][1],isWhiteSide,boardState)){
        // setIsOppoKingCheck(true)
        return true;
    }
   }

    //for Rooks
    let IndexsforRooks
    if(isWhiteSide){
        IndexsforRooks=getWhiteRookIndex(boardState)
    }else{
        IndexsforRooks=getBlackRookIndex(boardState)
    }
   for(let i=0;i<IndexsforRooks.length;i++) {
    if(attackBlocksForRooks(IndexsforRooks[i][0],IndexsforRooks[i][1],isWhiteSide,boardState)){
            // setIsOppoKingCheck(true)
            return true;
        }
   }

    //for Bishops
    let IndexsforBishops
    if(isWhiteSide){
        IndexsforBishops=getWhiteBishopIndex(boardState)
    }else{
        IndexsforBishops=getBlackBishopIndex(boardState)
    }
   for(let i=0;i<IndexsforBishops.length;i++) {
    if(attackBlocksForBishops(IndexsforBishops[i][0],IndexsforBishops[i][1],isWhiteSide,boardState)){
        // setIsOppoKingCheck(true)
        return true;
    }
   }
   
    //for Knights
    let IndexsforKnights
    if(isWhiteSide){
        IndexsforKnights=getWhiteKnightIndex(boardState)
    }else{
        IndexsforKnights=getBlackKnightIndex(boardState)
    }
   for(let i=0;i<IndexsforKnights.length;i++) {
    if(attackBlocksForKnight(IndexsforKnights[i][0],IndexsforKnights[i][1],isWhiteSide,boardState)){
        // setIsOppoKingCheck(true)
        return true;
    }
   }

    //for King
    let IndexsforKing
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if((isWhiteSide && boardState[i][j]==='♔') || (!isWhiteSide && boardState[i][j]==='♚')){
                    IndexsforKing=[i,j]
                }
            }
    }
    if(IndexsforKing!==undefined && attackBlocksForKing(IndexsforKing[0],IndexsforKing[1],isWhiteSide,boardState)){
        // setIsOppoKingCheck(true)
        return true;
    }

   return false;
//    setIsOppoKingCheck(false)
}