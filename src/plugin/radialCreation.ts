import { ReadialDensityCreation } from "../typings/interfaces";

export const radialCreation = (data: ReadialDensityCreation) => {
  const { width, height, size, density, x: rootX, y: rootY } = data;
  const rowCount = Math.floor(+height / density);
  const colCount = Math.floor(+width / density);
  const mainFrame = figma.createFrame();

  mainFrame.resize(width, height);
  mainFrame.fills = [
    {
      color: { r: 1, g: 1, b: 1 },
      type: "SOLID",
      opacity: 0,
    },
  ];

  const totalCount = rowCount * colCount;
  const maxDistance = calculateMaxDistance(width, height, rootX, rootY);

  radiusLinearRandomGeneration(
    mainFrame,
    maxDistance,
    totalCount,
    rootX,
    rootY,
    size
  );

  const parentFrame = figma.createFrame()
  parentFrame.resize(width, height);
  parentFrame.fills = [
    {
      color: { r: 1, g: 1, b: 1 },
      type: "SOLID",
    },
  ];

  parentFrame.appendChild(mainFrame)

  figma.flatten([mainFrame])
  figma.viewport.scrollAndZoomIntoView([parentFrame]);
};

const calculateMaxDistance = (
  width: number,
  height: number,
  rootX: number,
  rootY: number
) => {
  const d1 = Math.sqrt(Math.pow(rootX, 2) + Math.pow(rootY, 2));
  const d2 = Math.sqrt(Math.pow(width - rootX, 2) + Math.pow(rootY, 2));
  const d3 = Math.sqrt(Math.pow(rootX, 2) + Math.pow(height - rootY, 2));
  const d4 = Math.sqrt(
    Math.pow(width - rootX, 2) + Math.pow(height - rootY, 2)
  );
  return Math.max(d1, d2, d3, d4);
};

const radiusLinearRandomGeneration = (
  frame: FrameNode,
  maxDistance: number,
  totalCount: number,
  rootX: number,
  rootY: number,
  size: number
) => {
  const coefficient = 5;
  const circlesCount = Math.floor(totalCount / coefficient);
  const rCoef = maxDistance / circlesCount;
  let radius = rCoef;

  addEllipseToFrame(frame, rootX, rootY, size);
  for (let i = 0; i < circlesCount; i++) {
    for (let j = 0; j < coefficient; j++) {
      const deg = Math.random() * 2 * Math.PI;
      const deltaY = radius * Math.cos(deg);
      const dotY = rootY + deltaY;
      const deltaX = radius * Math.sin(deg);
      const dotX = rootX + deltaX;

      addEllipseToFrame(frame, dotX, dotY, size);
    }

    radius = radius + rCoef;
  }
};

const addEllipseToFrame = (
  frame: FrameNode,
  x: number,
  y: number,
  size: number
) => {
  const dot = figma.createEllipse();
  dot.resize(size, size);
  dot.fills = [
    {
      color: { r: 0, g: 0, b: 0 },
      type: "SOLID",
    },
  ];
  frame.appendChild(dot);
  dot.x = x;
  dot.y = y;
};
