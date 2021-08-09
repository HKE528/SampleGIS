import { createVworldImageWMS, layerCheckEventHandler, allClick } from "./vworldUtility.js";
import { map } from "../map/resource.js";

const checkBtnNsnmssitenm = document.getElementById("check-name");

const nsnmssitenmLayers = createVworldImageWMS("nsnmssitenmLayers", checkBtnNsnmssitenm.value);

checkBtnNsnmssitenm.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, nsnmssitenmLayers));