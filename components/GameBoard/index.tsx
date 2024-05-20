import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { GameContext } from "@/context/game-context";

import { GRID_SIZE, SPACING } from "@/utils/constants";
import { calcTileSize } from "@/utils/calculate";
import MobileSwiper, { SwipeInput } from "../mobile-swiper";
import GridWrapper from "../Grid/GridWrapper";
import Tile from "./Tile";
import { Box, Grid } from "@chakra-ui/react";

const GameBoard = () => {
  const { moveTiles, startGame, gameState, getTiles } = useContext(GameContext);
  const initialized = useRef(false);
  const [{ width: tileWidth, height: tileHeight }, setTileSize] = useState(() =>
    calcTileSize(GRID_SIZE, gameState.size, gameState.size, SPACING),
  );
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // disables page scrolling with keyboard arrows
      e.preventDefault();
      switch (e.code) {
        case "ArrowUp":
          moveTiles("up");
          break;
        case "ArrowDown":
          moveTiles("down");
          break;
        case "ArrowLeft":
          moveTiles("left");
          break;
        case "ArrowRight":
          moveTiles("right");
          break;
      }
    },
    [moveTiles],
  );

  const handleSwipe = useCallback(
    ({ deltaX, deltaY }: SwipeInput) => {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          moveTiles("right");
        } else {
          moveTiles("left");
        }
      } else {
        if (deltaY > 0) {
          moveTiles("down");
        } else {
          moveTiles("up");
        }
      }
    },
    [moveTiles],
  );

  useEffect(() => {
    if (initialized.current === false) {
      startGame();
      initialized.current = true;
    }
  }, [startGame]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <MobileSwiper onSwipe={handleSwipe}>
      <GridWrapper
        sx={{
          mb: 8,
          position: "relative",
        }}
        rows={gameState.size}
        cols={gameState.size}
        height={GRID_SIZE}
        width={GRID_SIZE}
        spacing={SPACING}
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          background="transparent"
          blockSize="100%"
          inlineSize="100%"
          as={Grid}
          gridTemplateColumns={`repeat(${gameState.size}, 1fr)`}
          gridTemplateRows={`repeat(${gameState.size}, 1fr)`}
        >
          {getTiles().map(({ row, col, value }) => (
            <Tile
              key={`${row}-${col}`}
              value={value}
              height={tileHeight}
              width={tileWidth}
            />
          ))}
        </Box>
      </GridWrapper>
    </MobileSwiper>
  );
};

export default GameBoard;
