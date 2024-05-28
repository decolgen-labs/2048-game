export const isWin = (tiles: number[][]) =>
  tiles.some((row) => row.includes(2048));

export const canGameContinue = (tiles: number[][]) => {
  const totalRows = tiles.length;
  const totalCols = tiles.length;

  // We can always continue the game when there are empty cells
  if (tiles.flat().includes(0)) return true;

  const dirs = [
    { r: -1, c: 0 }, // Up
    { r: 1, c: 0 }, // Down
    { r: 0, c: -1 }, // Left
    { r: 0, c: 1 }, // Right
  ];

  for (let r = 0; r < totalRows; r++) {
    for (let c = 0; c < totalCols; c++) {
      const value = tiles[r][c];
      if (value === 0) return true;

      for (let d = 0; d < dirs.length; d++) {
        const dir = dirs[d];
        const nextRow = r + dir.r;
        const nextCol = c + dir.c;

        if (
          nextRow >= 0 &&
          nextRow < totalRows &&
          nextCol >= 0 &&
          nextCol < totalCols
        ) {
          const nextValue = tiles[nextRow][nextCol];
          if (nextValue === 0 || nextValue === value) return true;
        }
      }
    }
  }

  return false;
};
