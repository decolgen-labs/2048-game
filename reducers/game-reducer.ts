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
  | { type: "update_point"; point: number }
  | { type: "clean_up" };

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
    case "update_point": {
      const { point } = action;
      return {
        ...state,
        score: point,
      };
    }
    case "clean_up": {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
