import { createVworldImageWMS, layerCheckEventHandler, allClick } from "./vworldUtility.js";
import { map } from "../map/resource.js";

const checkBtnBoundaryAll = document.getElementById("check-ad-all");
const checkBtnMegalopolis = document.getElementById("check-adsido");
const checkBtnRi = document.getElementById("check-adri");
const checkBtnSigg = document.getElementById("check-adsigg");
const checkBtnEMD = document.getElementById("check-ademd");

const listBoundaryCheckBtn = [
    checkBtnMegalopolis,    //광역시도
    checkBtnRi,             //리
    checkBtnSigg,           //시군구
    checkBtnEMD             //읍면동
]

const megalopolisLayers = createVworldImageWMS("megalopolisLayers", checkBtnMegalopolis.value);
const riLayers = createVworldImageWMS("riLayers", checkBtnRi.value);
const siggLayers = createVworldImageWMS("siggLayers", checkBtnSigg.value);
const emdLayers = createVworldImageWMS("emdLayers", checkBtnEMD.value);

checkBtnMegalopolis.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, megalopolisLayers));
checkBtnRi.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, riLayers));
checkBtnSigg.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, siggLayers));
checkBtnEMD.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, emdLayers));

checkBtnBoundaryAll.addEventListener("change", (evt) => {
    allClick(evt.target, listBoundaryCheckBtn);
});