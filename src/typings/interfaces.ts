export interface LinearDensityCreation {
  type: "linear-density",
  width: number;
  height: number;
  size: number;
  density: number;
}

export interface ReadialDensityCreation {
  type: "radial-density",
  width: number;
  height: number;
  size: number;
  density: number;
  x: number;
  y: number;
}