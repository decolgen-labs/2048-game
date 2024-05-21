import { MoveDirection } from "@/context/game-context";
import { ACCESS_TOKEN } from "@/utils/constants";
import { getCookie } from "@/utils/cookie";
import { deserialize } from "@/utils/serialize";

import { io } from "socket.io-client";

// .
const socketGame2048 = io("http://localhost:5002", {
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
      },
    },
  },
});

export default socketGame2048;
// Sender Action

export const startGameSocket = (size: number) => {
  socketGame2048.emit("startNewGame", {
    size: size,
  });
};

export const cancelGame = () => {
  socketGame2048.emit("cancelGame");
};
export const senderCommand = (direction: MoveDirection) => {
  socketGame2048.emit("command", {
    direction,
  });
};

export const claimPoint = () => {
  socketGame2048.emit("claimPoint");
};

export function getBoardData(): Promise<number[][]> {
  return new Promise((resolve) => {
    socketGame2048.on("board-updated", (data) => {
      const board = deserialize(data);
      resolve(board);
    });
  });
}

type GetPointData = {
  point: number;
  claimable: boolean;
};
export function getGamePoint(): Promise<GetPointData> {
  return new Promise((resolve) => {
    socketGame2048.on("game-point", (data) => {
      resolve(data);
    });
  });
}
