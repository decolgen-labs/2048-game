import { MoveDirection } from "@/context/game-context";
import { ACCESS_TOKEN } from "@/utils/constants";
import { getCookie } from "@/utils/cookie";
import { deserialize } from "@/utils/serialize";

import { io } from "socket.io-client";

// .
export const socketGame2048 = io("http://localhost:5002", {
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
      },
    },
  },
});

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
