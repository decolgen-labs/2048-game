import { senderCommand } from "@/config/socket_karas";
import { MIN_SIZE_BOARD } from "@/themes/constants";

type State = {
  board: number[][];
  hasChanged: boolean;
  score: number;
  size: number;
};
type Action =
  | { type: "update_board"; boardData: number[][] }
  | { type: "config_size"; size: number }
  | { type: "clean_up" }
  | { type: "up" }
  | { type: "down" }
  | { type: "left" }
  | { type: "right" };

export const initialState: State = {
  board: [],
  hasChanged: false,
  score: 0,
  size: MIN_SIZE_BOARD,
};

export default function gameReducer(
  state: State = initialState,
  action: Action,
) {
  switch (action.type) {
    case "update_board": {
      const { boardData } = action;
      console.log("????", boardData);
      return {
        ...state,
        board: boardData,
        hasChanged: false,
      };
    }
    case "config_size": {
      const { size } = action;
      return {
        ...state,
        size,
      };
    }
    case "up": {
      let { score } = state;
      console.log("Up");
      senderCommand("up");
      return {
        ...state,
        score,
        hasChanged: true,
      };
    }
    case "down": {
      senderCommand("down");
      console.log("down");
      return {
        ...state,
        hasChanged: true,
      };
    }
    case "left": {
      senderCommand("left");
      console.log("left");
      return {
        ...state,
        hasChanged: true,
      };
    }
    case "right": {
      senderCommand("right");
      console.log("right");
      return {
        ...state,
        hasChanged: true,
      };
    }
    default:
      return state;
  }
}
