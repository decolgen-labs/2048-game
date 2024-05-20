import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { isNil, throttle } from "lodash";
import { mergeAnimationDuration } from "@/constants";

import gameReducer, { initialState } from "@/reducers/game-reducer";
import { getBoardData, startGameSocket } from "@/config/socket_karas";

export type MoveDirection = "up" | "down" | "left" | "right";

export const GameContext = createContext({
  score: 0,
  moveTiles: (_: MoveDirection) => {},
  getTiles: () => [] as any,
  startGame: () => {},
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

  // const moveTiles = useCallback(
  //   throttle(
  //     (type: MoveDirection) => dispatch({ type }),
  //     mergeAnimationDuration * 1.05,
  //     { trailing: false },
  //   ),
  //   [dispatch],
  // );
  const moveTiles = (type: MoveDirection) => {
    dispatch({ type });
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
