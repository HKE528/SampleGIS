import { createVworldImageWMS, layerCheckEventHandler, allClick } from "./vworldUtility.js";
import { map } from "../map/resource.js";

const checkBtnFarmAll = document.getElementById("check-all-agrixue");
const checkBtnAgricultural = document.getElementById("check-agrixue101");
const checkBtnIrrigation = document.getElementById("check-rifct");
const checkBtnUnagricultural = document.getElementById("check-agrixue102");
const checkBtnReservoir = document.getElementById("check-rirsv");

const listFarmCheckBtn = [
    checkBtnAgricultural,    //농업진흥지역도
    checkBtnIrrigation,             //수리시설
    checkBtnUnagricultural,           //영농여건불리농지도
    checkBtnReservoir             //저수지
]

const agriculturalLayers = createVworldImageWMS("agriculturalLayers", checkBtnAgricultural.value);
const irrigationLayers = createVworldImageWMS("irrigationLayers", checkBtnIrrigation.value);
const unagriculturalLayers = createVworldImageWMS("unagriculturalLayers", checkBtnUnagricultural.value);
const reservoirLayers = createVworldImageWMS("reservoirLayers", checkBtnReservoir.value);

checkBtnAgricultural.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, agriculturalLayers));
checkBtnIrrigation.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, irrigationLayers));
checkBtnUnagricultural.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, unagriculturalLayers));
checkBtnReservoir.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, reservoirLayers));

checkBtnFarmAll.addEventListener("change", (evt) => {
    allClick(evt.target, listFarmCheckBtn);
});