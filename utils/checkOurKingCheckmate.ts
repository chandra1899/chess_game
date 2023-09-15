import { getWhitePawnsIndex ,getBlackPawnsIndex ,attackBlocksForPawns} from "./pieces/pawn"
import { getWhiteRookIndex ,getBlackRookIndex ,attackBlocksForRooks} from "./pieces/rook"
import { getWhiteBishopIndex ,getBlackBishopIndex ,attackBlocksForBishops} from "./pieces/bishop"
import { getWhiteKnightIndex ,getBlackKnightIndex,attackBlocksForKnight} from "./pieces/knight"
import { attackBlocksForKing } from "./pieces/king"

export const checkOurKingCheckmate=(newBoardState:[[string]],isWhiteSide:boolean)=>{
    // console.log(typeof newBoardState);
    
    //for pawns
    let IndexsPawns
    if(!isWhiteSide){
        IndexsPawns=getWhitePawnsIndex(newBoardState)
    }else{
        IndexsPawns=getBlackPawnsIndex(newBoardState)
    }
   for(let i=0;i<IndexsPawns.length;i++) {
    if(attackBlocksForPawns(IndexsPawns[i][0],IndexsPawns[i][1],!isWhiteSide,newBoardState)){
        // setIsOppoKingCheck(true)
        return true;
    }
   }

    //for Rooks
    let IndexsforRooks
    if(!isWhiteSide){
        IndexsforRooks=getWhiteRookIndex(newBoardState)
    }else{
        IndexsforRooks=getBlackRookIndex(newBoardState)
    }
   for(let i=0;i<IndexsforRooks.length;i++) {
    if(attackBlocksForRooks(IndexsforRooks[i][0],IndexsforRooks[i][1],!isWhiteSide,newBoardState)){
            // setIsOppoKingCheck(true)
            return true;
        }
   }

    //for Bishops
    let IndexsforBishops
    if(!isWhiteSide){
        IndexsforBishops=getWhiteBishopIndex(newBoardState)
    }else{
        IndexsforBishops=getBlackBishopIndex(newBoardState)
    }
   for(let i=0;i<IndexsforBishops.length;i++) {
    if(attackBlocksForBishops(IndexsforBishops[i][0],IndexsforBishops[i][1],!isWhiteSide,newBoardState)){
        // setIsOppoKingCheck(true)
        return true;
    }
   }
   
    //for Knights
    let IndexsforKnights
    if(!isWhiteSide){
        IndexsforKnights=getWhiteKnightIndex(newBoardState)
    }else{
        IndexsforKnights=getBlackKnightIndex(newBoardState)
    }
   for(let i=0;i<IndexsforKnights.length;i++) {
    if(attackBlocksForKnight(IndexsforKnights[i][0],IndexsforKnights[i][1],!isWhiteSide,newBoardState)){
        // setIsOppoKingCheck(true)
        return true;
    }
   }

    //for King
    let IndexsforKing
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if((!isWhiteSide && newBoardState[i][j]==='♔') || (isWhiteSide && newBoardState[i][j]==='♚')){
                    IndexsforKing=[i,j]
                }
            }
    }
    if(IndexsforKing!==undefined && attackBlocksForKing(IndexsforKing[0],IndexsforKing[1],!isWhiteSide,newBoardState)){
        // setIsOppoKingCheck(true)
        return true;
    }

   return false;
//    setIsOppoKingCheck(false)
}