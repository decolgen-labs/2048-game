export const getTileFontSize = (w: number, h: number, v: number) => {
  const factor = v >= 1024 ? 2.8 : 2;
  return Math.min(w, h) / factor;
};
export const clamp = (d: number, min: number, max: number) =>
  Math.max(Math.min(max, d), min);

export const getTileColor = (v: number) => `tile${clamp(v, 2, 2048)}`;

export const calcSegmentSize = (
  length: number,
  segmentNum: number,
  spacing: number,
) => (length - (segmentNum + 1) * spacing) / segmentNum;

export const calcTileSize = (
  gridSize: number,
  rows: number,
  cols: number,
  spacing: number,
) => ({
  width: calcSegmentSize(gridSize, cols, spacing),
  height: calcSegmentSize(gridSize, rows, spacing),
});

// Create Index Array Function
export const createIndexArray = (len: number) => Array.from(Array(len).keys());

// Calculate Location Function
export const calcLocation = (l: number, c: number, spacing: number) =>
  (spacing + l) * c + spacing;
