import { Left, Right } from "@/components"

const rows=['A','B','C','D','E','F','G','H']
const cols=['1','2','3','4','5','6','7','8']
const initialBoardState = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  ];

export default async function Game() {
  
  return (
    <main className='flex justify-center items-center bg-black'>
      <div className='flex flex-row justify-center items-center h-auto w-[97vw]'>
        <Left/>

        <div className='chessboard h-[100vh] w-[49%] bg-[#222222e6] flex flex-col justify-center items-center'>
            <div className='h-auto w-[100%]  flex flex-col justify-center items-center'>
                {rows.map((row,rowIndex)=>(
                    <div className="flex flex-row">
                        {cols.map((col,colIndex)=>(
                            <div className={`h-[57px] w-[57px] cursor-pointer text-[3rem] flex justify-center items-center ${rowIndex%2===0?`${colIndex%2==0?`bg-[#E6BF83]`:`bg-[#8C6529]`}`:`${colIndex%2==0?`bg-[#8C6529]`:`bg-[#E6BF83]`}`}`}>
                                {initialBoardState[rowIndex][colIndex]}
                            </div>
                        ))}
                    </div>
                ))}

            </div>
        </div>

        <Right/>
      </div>
    </main>
  )
}
