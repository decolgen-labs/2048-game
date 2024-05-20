import { PropsWithChildren, createContext, useEffect, useReducer } from "react";

import gameReducer, { initialState } from "@/reducers/game-reducer";
import { getBoardData, startGameSocket } from "@/config/socket_karas";

export type MoveDirection = "up" | "down" | "left" | "right";

export const GameContext = createContext({
  score: 0,
  moveTiles: (_: MoveDirection) => {},
  getTiles: () => [] as any,
  startGame: () => {},
  configNewSize: (size: number) => {},
});

export default function GameProvider({ children }: PropsWithChildren) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const getTiles = () => {
    return gameState.board.flatMap((row, rowIndex) =>
      row.map((tile, colIndex) => ({
        row: rowIndex,
        col: colIndex,
        value: tile,
      })),
    );
  };

  const moveTiles = (type: MoveDirection) => {
    dispatch({ type });
  };

  const configNewSize = (size: number) => {
    dispatch({ type: "config_size", size });
  };

  const startGame = async () => {
    startGameSocket(4);
    const data = await getBoardData();

    dispatch({
      type: "update_board",
      boardData: data,
    });
    console.log("First Run", gameState.board);
  };
  useEffect(() => {
    async function updateInfo() {
      if (gameState.hasChanged) {
        const data = await getBoardData();
        console.log("data cai WTF", data);
        dispatch({
          type: "update_board",
          boardData: data,
        });
      }
    }
    updateInfo();
  }, [gameState.hasChanged]);
  return (
    <GameContext.Provider
      value={{
        score: gameState.score,
        getTiles,
        moveTiles,
        startGame,
        configNewSize,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
