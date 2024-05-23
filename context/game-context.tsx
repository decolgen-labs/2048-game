import { PropsWithChildren, createContext, useReducer } from "react";

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
  moveTiles: (_: MoveDirection) => {}, // Flat Map Array
  getTiles: () => [] as any,
  startGame: () => {},
  configNewSize: (size: number) => {},
  cleanGame: () => {},
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

    dispatch({
      type: "update_board",
      boardData: data,
    });

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
    startGameSocket(gameState.size);
    const data = await getBoardData();
    dispatch({
      type: "update_board",
      boardData: data,
    });
  };
  const cleanGame = async () => {
    dispatch({ type: "clean_up" });
  };

  return (
    <GameContext.Provider
      value={{
        score: gameState.score,
        getTiles,
        moveTiles,
        startGame,
        configNewSize,
        gameState,
        cleanGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
