import { LinearDensityCreation } from "../typings/interfaces";

export const linearCreation = (data: LinearDensityCreation) => {
  const { width, height, size } = data;
  const num = 5;
  const scale = data.density * num;
  const rowCount = Math.floor(+height / scale);
  const colCount = Math.floor(+width / scale);

  const mainFrame = figma.createFrame();
  mainFrame.resize(width, height);
  mainFrame.fills = [
    {
      color: { r: 1, g: 1, b: 1 },
      type: "SOLID",
      opacity: 0,
    },
  ];
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      for (let k = 0; k < Math.pow(num, 2); k++) {
        const x = Math.random() * scale + j * scale - size / 2;
        const y = Math.random() * scale + i * scale - size / 2;
        const dot = figma.createEllipse();
        dot.resize(size, size);
        dot.fills = [
          {
            color: { r: 0, g: 0, b: 0 },
            type: "SOLID",
          },
        ];
        mainFrame.appendChild(dot);
        dot.x = x;
        dot.y = y;
      }
    }
  }

  figma.flatten([mainFrame]);
  figma.viewport.scrollAndZoomIntoView([mainFrame]);
};
