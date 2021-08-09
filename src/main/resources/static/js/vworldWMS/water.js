import { createVworldImageWMS, layerCheckEventHandler, allClick } from "./vworldUtility.js";
import { map } from "../map/resource.js";

const checkBtnWaterResourceAll = document.getElementById("check-all-wkm");
const checkBtnBigSpace = document.getElementById("check-wkmbbsn");
const checkBtnMiddleSpace = document.getElementById("check-wkmmbsn");
const checkBtnStandardSpace = document.getElementById("check-wkmsbsn");
const checkBtnRiverNetwork = document.getElementById("check-wkmstrm");

const listWaterCheckBtn = [
    checkBtnBigSpace,       // 대권역
    checkBtnMiddleSpace,    // 중권역
    checkBtnStandardSpace,  // 표준권역
    checkBtnRiverNetwork    // 하천망
]

const bigSpaceLayers = createVworldImageWMS("bigSpaceLayers", checkBtnBigSpace.value);
const middleSpaceLayers = createVworldImageWMS("middleSpaceLayers", checkBtnMiddleSpace.value);
const standardSpaceLayers = createVworldImageWMS("standardSpaceLayers", checkBtnStandardSpace.value);
const riverNetworkLayers = createVworldImageWMS("riverNetworkLayers", checkBtnRiverNetwork.value);

checkBtnBigSpace.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, bigSpaceLayers));
checkBtnMiddleSpace.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, middleSpaceLayers));
checkBtnStandardSpace.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, standardSpaceLayers));
checkBtnRiverNetwork.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, riverNetworkLayers));

checkBtnWaterResourceAll.addEventListener("change", (evt) => {
    allClick(evt.target, listWaterCheckBtn);
});