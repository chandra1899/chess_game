"use client"

import { board } from '@/store/atoms/board';
import { WhiteSideIs } from '@/store/atoms/whiteSIde';
import { highlightedArray } from '@/store/atoms/highlight';
import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { checkCheckmate } from '@/store/atoms/checkCheckmate';
import { capture } from '@/store/atoms/capture';
import { selected } from '@/store/atoms/selectedBlock';
import { isOppoKingChecked } from '@/store/atoms/isOppoKingChecked';
import { isOurKingChecked } from '@/store/atoms/isOurKingChecked';

const rows=['A','B','C','D','E','F','G','H']
const cols=['1','2','3','4','5','6','7','8']
const blackParts=["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜","♟︎"]
const whiteParts=["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖","♙"]

// const initialBoardState = [
//     ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
//     ["♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎"],
//     ["", "", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", "", ""],
//     ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
//     ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
//   ];

type inputArrayElement=undefined | number

const Board = () => {
    const highlightedBox=useRecoilValue(highlightedArray)
    const isOppoKingCheck=useRecoilValue(isOppoKingChecked)
    const isOurKingCheck=useRecoilValue(isOurKingChecked)
    const attackBox=useRecoilValue(checkCheckmate)
    const boardState=useRecoilValue(board)
    const isWhiteSide=useRecoilValue(WhiteSideIs)
    const setHighlightedBox=useSetRecoilState(highlightedArray)
    const setIsOurKingCheck=useSetRecoilState(isOurKingChecked)
    const setIsOppoKingCheck=useSetRecoilState(isOppoKingChecked)
    const setCheckCheckmateBox=useSetRecoilState(checkCheckmate)
    const setSelectedSol=useSetRecoilState(selected)
    const setBoardState=useSetRecoilState(board)
    const selectedSol=useRecoilValue(selected)

    const isHighlighted=(row:number,col:number):boolean=>{   
        return highlightedBox.some(arr => 
          arr.length === [row,col].length && arr.every((value:number, index:number) => value === [row,col][index])
        );
    }

    const isBlack=(row:number,col:number)=>{
        // console.log(board[row][col]);
        
        return blackParts.includes(boardState[row][col])
    }
    
    const isWhite=(row:number,col:number)=>{
        return whiteParts.includes(boardState[row][col])
    }

    const hightlightBlocksForRook=(row:number,col:number)=>{
        //1st side
        let newRow1=row-1;
        let newCol1=col;
        while(isValid(newRow1,newCol1) && boardState[newRow1][newCol1]===""){
            console.log('hello2');
            setHighlightedBox((pre)=>[...pre,[newRow1,newCol1]]);
            newRow1--
        }
        if(isValid(newRow1,newCol1) && ((isWhiteSide && isBlack(newRow1,newCol1)) || (!isWhiteSide && isWhite(newRow1,newCol1)))){
            setHighlightedBox((pre)=>[...pre,[newRow1,newCol1]]);
        }
        //2st side
        let newRow2=row+1;
        let newCol2=col;
        while(isValid(newRow2,newCol2) && boardState[newRow2][newCol2]===""){
            // console.log('hello2');
            setHighlightedBox((pre)=>[...pre,[newRow2,newCol2]]);
            newRow2++
        }
        if(isValid(newRow2,newCol2) && ((isWhiteSide && isBlack(newRow2,newCol2)) || (!isWhiteSide && isWhite(newRow2,newCol2)))){
            setHighlightedBox((pre)=>[...pre,[newRow2,newCol2]]);
        }
        //3rd side
        let newRow3=row;
        let newCol3=col-1;
        while(isValid(newRow3,newCol3) && boardState[newRow3][newCol3]===""){
            // console.log('hello2');
            setHighlightedBox((pre)=>[...pre,[newRow3,newCol3]]);
            newCol3--
        }
        if(isValid(newRow3,newCol3) && ((isWhiteSide && isBlack(newRow3,newCol3)) || (!isWhiteSide && isWhite(newRow3,newCol3)))){
            setHighlightedBox((pre)=>[...pre,[newRow3,newCol3]]);
        }
        //4rth side
        let newRow4=row;
        let newCol4=col+1;
        while(isValid(newRow4,newCol4) && boardState[newRow4][newCol4]===""){
            // console.log('hello2');
            setHighlightedBox((pre)=>[...pre,[newRow4,newCol4]]);
            newCol4++
        }
        if(isValid(newRow4,newCol4) && ((isWhiteSide && isBlack(newRow4,newCol4)) || (!isWhiteSide && isWhite(newRow4,newCol4)))){
            setHighlightedBox((pre)=>[...pre,[newRow4,newCol4]]);
        }
    }

    const hightlightBlocksForBishop=(row:number,col:number)=>{
         //1st side
         let newRow1=row-1;
         let newCol1=col-1;
         while(isValid(newRow1,newCol1) && boardState[newRow1][newCol1]===""){
            //  console.log('hello2');
             setHighlightedBox((pre)=>[...pre,[newRow1,newCol1]]);
             newRow1--
             newCol1--
         }
         if(isValid(newRow1,newCol1) && ((isWhiteSide && isBlack(newRow1,newCol1)) || (!isWhiteSide && isWhite(newRow1,newCol1)))){
             setHighlightedBox((pre)=>[...pre,[newRow1,newCol1]]);
         }
         //2st side
         let newRow2=row+1;
         let newCol2=col+1;
         while(isValid(newRow2,newCol2) && boardState[newRow2][newCol2]===""){
             // console.log('hello2');
             setHighlightedBox((pre)=>[...pre,[newRow2,newCol2]]);
             newRow2++
             newCol2++
         }
         if(isValid(newRow2,newCol2) && ((isWhiteSide && isBlack(newRow2,newCol2)) || (!isWhiteSide && isWhite(newRow2,newCol2)))){
             setHighlightedBox((pre)=>[...pre,[newRow2,newCol2]]);
         }
         //3rd side
         let newRow3=row+1;
         let newCol3=col-1;
         while(isValid(newRow3,newCol3) && boardState[newRow3][newCol3]===""){
             // console.log('hello2');
             setHighlightedBox((pre)=>[...pre,[newRow3,newCol3]]);
             newCol3--
             newRow3++
         }
         if(isValid(newRow3,newCol3) && ((isWhiteSide && isBlack(newRow3,newCol3)) || (!isWhiteSide && isWhite(newRow3,newCol3)))){
             setHighlightedBox((pre)=>[...pre,[newRow3,newCol3]]);
         }
         //4rth side
         let newRow4=row-1;
         let newCol4=col+1;
         while(isValid(newRow4,newCol4) && boardState[newRow4][newCol4]===""){
             // console.log('hello2');
             setHighlightedBox((pre)=>[...pre,[newRow4,newCol4]]);
             newCol4++
             newRow4--
         }
         if(isValid(newRow4,newCol4) && ((isWhiteSide && isBlack(newRow4,newCol4)) || (!isWhiteSide && isWhite(newRow4,newCol4)))){
             setHighlightedBox((pre)=>[...pre,[newRow4,newCol4]]);
         }
    }

    const hightlightBlocksForKing=(row:number,col:number)=>{
        const newRow=[-1,0,1]
        const newCol=[-1,0,1]
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(!(newRow[i]===0 && newCol[j]===0) && isValid(row+newRow[i],col+newCol[j]) && ((isWhiteSide && !isWhite(row+newRow[i],col+newCol[j])) || (!isWhiteSide && !isBlack(row+newRow[i],col+newCol[j])))){  
                    setHighlightedBox((pre)=>[...pre,[row+newRow[i],col+newCol[j]]]);
                }
            }
        }
    }

    const hightlightBlocksForKnight=(row:number,col:number)=>{
        let possiblilities=[[-1,-2],[-1,2],[1,-2],[1,2],[-2,-1],[-2,1],[2,-1],[2,1]]
        for(let i=0;i<possiblilities.length;i++){
            if(isValid(row+possiblilities[i][0],col+possiblilities[i][1]) && ((isWhiteSide && !isWhite(row+possiblilities[i][0],col+possiblilities[i][1])) || (!isWhiteSide && !isBlack(row+possiblilities[i][0],col+possiblilities[i][1])))){
                setHighlightedBox((pre)=>[...pre,[row+possiblilities[i][0],col+possiblilities[i][1]]])
            }
        }
    }

    const hightlightBlocksForPawns=(row:number,col:number)=>{
        if(isWhiteSide){
            if(isValid(row-1,col) && boardState[row-1][col]===""){
                if(isValid(row-1,col))
                setHighlightedBox([[row-1,col]])
                if(row===6){
                    if(isValid(row-2,col) && boardState[row-2][col]===""){
                        setHighlightedBox((pre)=>[...pre,[row-2,col]])
                    }
                }
            }
            if(isValid(row-1,col-1) && isBlack(row-1,col-1)){
                setHighlightedBox((pre)=>{return [...pre,[row-1,col-1]]})
            }
            if( isValid(row-1,col+1) && isBlack(row-1,col+1)){
                setHighlightedBox((pre)=>{return [...pre,[row-1,col+1]]})
            }
        }
        else{
            if(isValid(row+1,col) && boardState[row+1][col]===""){
                if(isValid(row+1,col))
                setHighlightedBox([[row+1,col]])
                if(row===1){
                    if(isValid(row+2,col) && boardState[row+2][col]===""){
                        setHighlightedBox((pre)=>[...pre,[row+2,col]])
                    }
                }
            }
            if(isValid(row+1,col+1) && isWhite(row+1,col+1)){
                setHighlightedBox((pre)=>{return [...pre,[row+1,col+1]]})
            }
            if( isValid(row+1,col-1) && isWhite(row+1,col-1)){
                setHighlightedBox((pre)=>{return [...pre,[row+1,col-1]]})
            }
        } 
    }

    const getWhitePawnsIndex=()=>{
        let Indexs=[];
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(boardState[i][j]==='♙'){
                    Indexs.push([i,j])
                }
            }
        }
        return Indexs;
    }

    const getBlackPawnsIndex=()=>{
        let Indexs=[];
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(boardState[i][j]==='♟︎'){
                    Indexs.push([i,j])
                }
            }
        }
        return Indexs;
    }

    const getWhiteRookIndex=()=>{
        let Indexs=[];
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(boardState[i][j]==='♖' || boardState[i][j]==='♕'){
                    Indexs.push([i,j])
                }
            }
        }
        return Indexs;
    }

    const getBlackRookIndex=()=>{
        let Indexs=[];
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(boardState[i][j]==='♜' || boardState[i][j]==='♛'){
                    Indexs.push([i,j])
                }
            }
        }
        return Indexs;
    }

    const getWhiteBishopIndex=()=>{
        let Indexs=[];
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(boardState[i][j]==='♗' || boardState[i][j]==='♕'){
                    Indexs.push([i,j])
                }
            }
        }
        return Indexs;
    }

    const getBlackBishopIndex=()=>{
        let Indexs=[];
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(boardState[i][j]==='♝' || boardState[i][j]==='♛'){
                    Indexs.push([i,j])
                }
            }
        }
        return Indexs;
    }

    const getWhiteKnightIndex=()=>{
        let Indexs=[];
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(boardState[i][j]==='♘'){
                    Indexs.push([i,j])
                }
            }
        }
        return Indexs;
    }
    const getBlackKnightIndex=()=>{
        let Indexs=[];
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(boardState[i][j]==='♞'){
                    Indexs.push([i,j])
                }
            }
        }
        return Indexs;
    }

    const attackBlocksForPawns=(row:number,col:number,fromWhiteSide:boolean)=>{
        if(fromWhiteSide){
            if(isValid(row-1,col-1) && boardState[row-1][col-1]==="♚"){
                return true
            }
            if(isValid(row-1,col+1) && boardState[row-1][col+1]==="♚"){
                return true
            }
            return false
        }
        else{
            if(isValid(row+1,col+1) && boardState[row+1][col+1]==="♔"){
                return true
            }
            if(isValid(row+1,col-1) && boardState[row+1][col-1]==="♔"){
                return true
            }
            return false
        }
      
    }
    const attackBlocksForRooks=(row:number,col:number,fromWhiteSide:boolean)=>{
         //1st side
         let newRow1=row-1;
         let newCol1=col;
         while(isValid(newRow1,newCol1) && boardState[newRow1][newCol1]===""){
             newRow1--
         }
         if(isValid(newRow1,newCol1) && ((fromWhiteSide && boardState[newRow1][newCol1]==='♚') || (!fromWhiteSide && boardState[newRow1][newCol1]==='♔'))){
            return true
         }
         //2st side
         let newRow2=row+1;
         let newCol2=col;
         while(isValid(newRow2,newCol2) && boardState[newRow2][newCol2]===""){
             newRow2++
         }
         if(isValid(newRow2,newCol2) && ((fromWhiteSide && boardState[newRow2][newCol2]==='♚') || (!fromWhiteSide && boardState[newRow2][newCol2]==='♔'))){
            return true
         }
         //3rd side
         let newRow3=row;
         let newCol3=col-1;
         while(isValid(newRow3,newCol3) && boardState[newRow3][newCol3]===""){
             newCol3--
         }
         if(isValid(newRow3,newCol3) && ((fromWhiteSide && boardState[newRow3][newCol3]==='♚') || (!fromWhiteSide && boardState[newRow3][newCol3]==='♔'))){
            return true
         }
         //4rth side
         let newRow4=row;
         let newCol4=col+1;
         while(isValid(newRow4,newCol4) && boardState[newRow4][newCol4]===""){
             newCol4++
         }
         if(isValid(newRow4,newCol4) && ((fromWhiteSide && boardState[newRow4][newCol4]==='♚') || (!fromWhiteSide && boardState[newRow4][newCol4]==='♔'))){
            return true
         }
         return false;
    }

    const attackBlocksForBishops=(row:number,col:number,fromWhiteSide:boolean)=>{
        //1st side
        let newRow1=row-1;
        let newCol1=col-1;
        while(isValid(newRow1,newCol1) && boardState[newRow1][newCol1]===""){
            newRow1--
            newCol1--
        }
        if(isValid(newRow1,newCol1) && ((fromWhiteSide && boardState[newRow1][newCol1]==='♚') || (!fromWhiteSide && boardState[newRow1][newCol1]==='♔'))){
            return true
        }
        //2st side
        let newRow2=row+1;
        let newCol2=col+1;
        while(isValid(newRow2,newCol2) && boardState[newRow2][newCol2]===""){
            newRow2++
            newCol2++
        }
        if(isValid(newRow2,newCol2) && ((fromWhiteSide && boardState[newRow2][newCol2]==='♚') || (!fromWhiteSide && boardState[newRow2][newCol2]==='♔'))){
            return true
        }
        //3rd side
        let newRow3=row+1;
        let newCol3=col-1;
        while(isValid(newRow3,newCol3) && boardState[newRow3][newCol3]===""){
            newCol3--
            newRow3++
        }
        if(isValid(newRow3,newCol3) && ((fromWhiteSide && boardState[newRow3][newCol3]==='♚') || (!fromWhiteSide && boardState[newRow3][newCol3]==='♔'))){
            return true
        }
        //4rth side
        let newRow4=row-1;
        let newCol4=col+1;
        while(isValid(newRow4,newCol4) && boardState[newRow4][newCol4]===""){
            newCol4++
            newRow4--
        }
        if(isValid(newRow4,newCol4) && ((fromWhiteSide && boardState[newRow4][newCol4]==='♚') || (!fromWhiteSide && boardState[newRow4][newCol4]==='♔'))){
            return true
        }
        return false
    }

    const attackBlocksForKnight=(row:number,col:number,fromWhiteSide:boolean)=>{
        let possiblilities=[[-1,-2],[-1,2],[1,-2],[1,2],[-2,-1],[-2,1],[2,-1],[2,1]]

        for(let i=0;i<possiblilities.length;i++){
            if(isValid(row+possiblilities[i][0],col+possiblilities[i][1]) && ((fromWhiteSide && boardState[row+possiblilities[i][0]][col+possiblilities[i][1]]==='♚') || (!fromWhiteSide && boardState[row+possiblilities[i][0]][col+possiblilities[i][1]]==='♔'))){
                return true
            }
        }
        return false
    }

    const attackBlocksForKing=(row:number,col:number,fromWhiteSide:boolean)=>{
        const newRow=[-1,0,1]
        const newCol=[-1,0,1]
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(!(newRow[i]===0 && newCol[j]===0) && isValid(row+newRow[i],col+newCol[j]) && ((fromWhiteSide && boardState[row+newRow[i]][col+newCol[j]]==='♚') || (!fromWhiteSide && boardState[row+newRow[i]][col+newCol[j]]==='♔'))){  
                    return true
                }
            }
        }
       return false
    }

    const checkOppositeKingCheckmate=()=>{
        //for pawns
        let IndexsPawns
        if(isWhiteSide){
            IndexsPawns=getWhitePawnsIndex()
        }else{
            IndexsPawns=getBlackPawnsIndex()
        }
       for(let i=0;i<IndexsPawns.length;i++) {
        if(attackBlocksForPawns(IndexsPawns[i][0],IndexsPawns[i][1],isWhiteSide)){
            // setIsOppoKingCheck(true)
            return true;
        }
       }

        //for Rooks
        let IndexsforRooks
        if(isWhiteSide){
            IndexsforRooks=getWhiteRookIndex()
        }else{
            IndexsforRooks=getBlackRookIndex()
        }
       for(let i=0;i<IndexsforRooks.length;i++) {
        if(attackBlocksForRooks(IndexsforRooks[i][0],IndexsforRooks[i][1],isWhiteSide)){
                // setIsOppoKingCheck(true)
                return true;
            }
       }

        //for Bishops
        let IndexsforBishops
        if(isWhiteSide){
            IndexsforBishops=getWhiteBishopIndex()
        }else{
            IndexsforBishops=getBlackBishopIndex()
        }
       for(let i=0;i<IndexsforBishops.length;i++) {
        if(attackBlocksForBishops(IndexsforBishops[i][0],IndexsforBishops[i][1],isWhiteSide)){
            // setIsOppoKingCheck(true)
            return true;
        }
       }
       
        //for Knights
        let IndexsforKnights
        if(isWhiteSide){
            IndexsforKnights=getWhiteKnightIndex()
        }else{
            IndexsforKnights=getBlackKnightIndex()
        }
       for(let i=0;i<IndexsforKnights.length;i++) {
        if(attackBlocksForKnight(IndexsforKnights[i][0],IndexsforKnights[i][1],isWhiteSide)){
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
        if(attackBlocksForKing(IndexsforKing[0],IndexsforKing[1],isWhiteSide)){
            // setIsOppoKingCheck(true)
            return true;
        }

       return false;
    //    setIsOppoKingCheck(false)
    }

    const checkOurKingCheckmate=()=>{
        //for pawns
        let IndexsPawns
        if(!isWhiteSide){
            IndexsPawns=getWhitePawnsIndex()
        }else{
            IndexsPawns=getBlackPawnsIndex()
        }
       for(let i=0;i<IndexsPawns.length;i++) {
        if(attackBlocksForPawns(IndexsPawns[i][0],IndexsPawns[i][1],!isWhiteSide)){
            // setIsOppoKingCheck(true)
            return true;
        }
       }

        //for Rooks
        let IndexsforRooks
        if(!isWhiteSide){
            IndexsforRooks=getWhiteRookIndex()
        }else{
            IndexsforRooks=getBlackRookIndex()
        }
       for(let i=0;i<IndexsforRooks.length;i++) {
        if(attackBlocksForRooks(IndexsforRooks[i][0],IndexsforRooks[i][1],!isWhiteSide)){
                // setIsOppoKingCheck(true)
                return true;
            }
       }

        //for Bishops
        let IndexsforBishops
        if(!isWhiteSide){
            IndexsforBishops=getWhiteBishopIndex()
        }else{
            IndexsforBishops=getBlackBishopIndex()
        }
       for(let i=0;i<IndexsforBishops.length;i++) {
        if(attackBlocksForBishops(IndexsforBishops[i][0],IndexsforBishops[i][1],!isWhiteSide)){
            // setIsOppoKingCheck(true)
            return true;
        }
       }
       
        //for Knights
        let IndexsforKnights
        if(!isWhiteSide){
            IndexsforKnights=getWhiteKnightIndex()
        }else{
            IndexsforKnights=getBlackKnightIndex()
        }
       for(let i=0;i<IndexsforKnights.length;i++) {
        if(attackBlocksForKnight(IndexsforKnights[i][0],IndexsforKnights[i][1],!isWhiteSide)){
            // setIsOppoKingCheck(true)
            return true;
        }
       }

        //for King
        let IndexsforKing
            for(let i=0;i<8;i++){
                for(let j=0;j<8;j++){
                    if((!isWhiteSide && boardState[i][j]==='♔') || (isWhiteSide && boardState[i][j]==='♚')){
                        IndexsforKing=[i,j]
                    }
                }
        }
        if(attackBlocksForKing(IndexsforKing[0],IndexsforKing[1],!isWhiteSide)){
            // setIsOppoKingCheck(true)
            return true;
        }

       return false;
    //    setIsOppoKingCheck(false)
    }

    const hightlightBlocks=(row:number,col:number)=>{
       
        //for pawn
        if((isWhiteSide && boardState[row][col]==='♙') || (!isWhiteSide && boardState[row][col]==='♟︎')){
            setHighlightedBox([[]])
            hightlightBlocksForPawns(row,col)         
                      
        }
        else if((isWhiteSide && boardState[row][col]==='♖') || (!isWhiteSide && boardState[row][col]==='♜')){
            setHighlightedBox([[]])
            hightlightBlocksForRook(row,col)   
        }
        else if((isWhiteSide && boardState[row][col]==='♗') || (!isWhiteSide && boardState[row][col]==='♝')){
            setHighlightedBox([[]])
            hightlightBlocksForBishop(row,col)
        }
        else if((isWhiteSide && boardState[row][col]==='♕') || (!isWhiteSide && boardState[row][col]==='♛')){
            setHighlightedBox([[]])
            hightlightBlocksForRook(row,col) 
            hightlightBlocksForBishop(row,col)
        }
        else if((isWhiteSide && boardState[row][col]==='♔') || (!isWhiteSide && boardState[row][col]==='♚')){
            setHighlightedBox([[]])
            hightlightBlocksForKing(row,col) 
        }
        else if((isWhiteSide && boardState[row][col]==='♘') || (!isWhiteSide && boardState[row][col]==='♞')){
            setHighlightedBox([[]])
            hightlightBlocksForKnight(row,col) 
        }
    }

    const isValid=(row:number,col:number)=>{
        if(row>=0 && row<=7 && col>=0 && col<=7 ) return true
        return false
    }
 
  
  const handleOnClick=async (row:number,col:number)=>{
    // console.log(row,col);
    // if(boardState[row][col]===""){
    //     setHighlightedBox([[row,col]])
    // }
     if((isWhiteSide && isWhite(row,col)) || (!isWhiteSide && isBlack(row,col))){
        hightlightBlocks(row,col)
    }
    // else setHighlightedBox([[]])

    if((isWhiteSide && isWhite(row,col)) || (!isWhiteSide && isBlack(row,col))){
        // console.log('i selected here');
        setSelectedSol([row,col])
    }else{
        if(selectedSol.length===0 && boardState[row][col]===""){
            setHighlightedBox([[row,col]])
        }else if((selectedSol.length===0 && isWhiteSide && isBlack(row,col)) || (selectedSol.length===0 && !isWhiteSide && isWhite(row,col))){
            setHighlightedBox([[]])
        }else if(selectedSol.length!==0){
            if(isHighlighted(row,col)){
                // console.log('i came here');
                
                setBoardState((pre)=>{
                    const newBoard=pre.map(innerArray => [...innerArray])
                    // console.log(newBoard);
                    // console.log(selectedSol[1]);
                    
                    newBoard[row][col]=newBoard[selectedSol[0]][selectedSol[1]]
                    newBoard[selectedSol[0]][selectedSol[1]]=""
                    return newBoard
                })
                // if(checkOppositeKingCheckmate()){
                //     setIsOppoKingCheck(true)
                // }else{
                //     setIsOppoKingCheck(false)
                // }
                if(boardState[row][col]===""){
                    //play move_Self
                    document.getElementById('move_self').play()

                }else if((isWhiteSide && isBlack(row,col) || (!isWhiteSide && isWhite(row,col)))){
                    //play capture
                    document.getElementById('capture').play()
                }
                setHighlightedBox([[row,col],[selectedSol[0],selectedSol[1]]])
            }else{
                if(boardState[row][col]===""){
                    setHighlightedBox([[row,col]])
                }else if((isWhiteSide && isBlack(row,col)) || (!isWhiteSide && isWhite(row,col))){
                    setHighlightedBox([[]])
                }
            }
        }
    }

  }
  useEffect(()=>{
    if(checkOppositeKingCheckmate()){
        setIsOppoKingCheck(true)
    }else{
        setIsOppoKingCheck(false)
    }
    if(checkOurKingCheckmate()){
        setIsOurKingCheck(true)
    }else{
        setIsOurKingCheck(false)
    }
  },[boardState])
  return (
    <div className={`h-auto w-[100%]  flex flex-col justify-center items-center ${isWhiteSide?'':'rotate-180'}`}>
                {rows.map((row,rowIndex)=>(
                    <div className="flex flex-row">
                        {cols.map((col,colIndex)=>(
                            <div className={`h-[57px] ${isWhiteSide?'':'rotate-180'} w-[57px] cursor-pointer text-[3rem] flex justify-center items-center border-[1px] border-black
                            ${isOppoKingCheck && ((isWhiteSide && boardState[rowIndex][colIndex]==='♚') || (!isWhiteSide && boardState[rowIndex][colIndex]==='♔'))?'bg-yellow-300':''}
                            ${isOurKingCheck && ((!isWhiteSide && boardState[rowIndex][colIndex]==='♚') || (isWhiteSide && boardState[rowIndex][colIndex]==='♔'))?'bg-yellow-300':''}
                            ${isHighlighted(rowIndex,colIndex)?
                                `${(isWhiteSide && isBlack(rowIndex,colIndex)) || (!isWhiteSide && isWhite(rowIndex,colIndex))?`bg-red-500`:`bg-green-500`}`
                            :`
                            ${rowIndex%2===0?`${colIndex%2==0?`bg-[#E6BF83]`:`bg-[#8C6529]`}`:`${colIndex%2==0?`bg-[#8C6529]`:`bg-[#E6BF83]`}`}`}
                            `}
                            onClick={()=>{handleOnClick(rowIndex,colIndex)}}
                            >
                                {boardState[rowIndex][colIndex]}
                            </div>
                        ))}
                    </div>
                ))}

            </div>
  )
}

export default Board
