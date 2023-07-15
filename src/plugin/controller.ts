import { LinearDensityCreation, ReadialDensityCreation } from "../typings/interfaces";
import { linearCreation } from "./linearCreation";
import { radialCreation } from "./radialCreation";

figma.showUI(__html__);

figma.ui.resize(320, 572);

figma.ui.onmessage = (pluginMessage: LinearDensityCreation | ReadialDensityCreation) => {
  if (pluginMessage.type === "linear-density") {
    linearCreation(pluginMessage)
  } else if (pluginMessage.type === "radial-density") {
    radialCreation(pluginMessage)
  }

  figma.closePlugin();
};