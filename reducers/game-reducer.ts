import { getBoardData, senderCommand } from "@/config/socket_karas";

type State = {
  board: number[][];
  hasChanged: boolean;
  score: number;
};
type Action =
  | { type: "update_board"; boardData: number[][] }
  | { type: "clean_up" }
  | { type: "up" }
  | { type: "down" }
  | { type: "left" }
  | { type: "right" };

export const initialState: State = {
  board: [],
  hasChanged: false,
  score: 0,
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
