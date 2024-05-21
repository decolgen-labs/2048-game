import { PropsWithChildren, createContext, useEffect, useReducer } from "react";

import gameReducer, { initialState } from "@/reducers/game-reducer";
import {
  getBoardData,
  getGamePoint,
  senderCommand,
  startGameSocket,
} from "@/config/socket_karas";

export type MoveDirection = "up" | "down" | "left" | "right";

export const GameContext = createContext({
  score: 0,
  moveTiles: (_: MoveDirection) => {},
  getTiles: () => [] as any,
  startGame: () => {},
  configNewSize: (size: number) => {},
  gameState: initialState,
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

  const moveTiles = async (type: MoveDirection) => {
    // dispatch({ type });

    senderCommand(type);
    const data = await getBoardData();
    console.log("data", data);
    dispatch({
      type: "update_board",
      boardData: data,
    });
    console.log("Game State", gameState.board);
    const point = await getGamePoint();
    dispatch({
      type: "update_point",
      point: point.point,
    });
  };

  const configNewSize = (size: number) => {
    dispatch({ type: "config_size", size });
  };

  const startGame = async () => {
    dispatch({ type: "update_point", point: 0 });
    startGameSocket(gameState.size);

    const data = await getBoardData();
    console.log("Now RUN Test Start Game", data);
    dispatch({
      type: "update_board",
      boardData: data,
    });
  };
  // useEffect(() => {
  //   async function updateInfo() {
  //     if (gameState.hasChanged) {
  //       const data = await getBoardData();
  //       console.log("data", data);
  //       const point = await getGamePoint();
  //       dispatch({
  //         type: "update_point",
  //         point: point.point,
  //       });
  //       dispatch({
  //         type: "update_board",
  //         boardData: data,
  //       });
  //     }
  //   }
  //   updateInfo();
  // }, [gameState.hasChanged]);
  return (
    <GameContext.Provider
      value={{
        score: gameState.score,
        getTiles,
        moveTiles,
        startGame,
        configNewSize,
        gameState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
