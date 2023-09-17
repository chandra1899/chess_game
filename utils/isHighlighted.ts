
export const isHighlighted=(row:number,col:number,highlightedBox:[[number]]):boolean=>{   
    return highlightedBox.some(arr => 
      arr.length === [row,col].length && arr.every((value:number, index:number) => value === [row,col][index])
    );
}

export const isHighlightedOppoMove=(row:number,col:number,highlightedOppoMoveBox:[[number]]):boolean=>{   
    return highlightedOppoMoveBox.some(arr => 
      arr.length === [row,col].length && arr.every((value:number, index:number) => value === [row,col][index])
    );
}