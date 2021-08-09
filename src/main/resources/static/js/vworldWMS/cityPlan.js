import { createVworldImageWMS, layerCheckEventHandler, allClick } from "./vworldUtility.js";
import { map } from "../map/resource.js";

const checkBtnCityPlanAll = document.getElementById("check-all-upisuq");
const checkBtnSpaceFacility = document.getElementById("check-upisuq153");
const checkBtnTrafficFacility = document.getElementById("check-upisuq152");
const checkBtnLoad = document.getElementById("check-upisuq151");
const checkBtnOtherFacility = document.getElementById("check-upisuq159");

const listFarmCheckBtn = [
    checkBtnSpaceFacility,      // 공간시설
    checkBtnTrafficFacility,    // 교통시설
    checkBtnLoad,               // 도로
    checkBtnOtherFacility       // 기타기반시설
]

const spaceFacilityLayers = createVworldImageWMS("agriculturalLayers", checkBtnSpaceFacility.value);
const trafficFacilityLayers = createVworldImageWMS("irrigationLayers", checkBtnTrafficFacility.value);
const loadLayers = createVworldImageWMS("unagriculturalLayers", checkBtnLoad.value);
const otherFacilityLayers = createVworldImageWMS("reservoirLayers", checkBtnOtherFacility.value);

checkBtnSpaceFacility.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, spaceFacilityLayers));
checkBtnTrafficFacility.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, trafficFacilityLayers));
checkBtnLoad.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, loadLayers));
checkBtnOtherFacility.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, otherFacilityLayers));

checkBtnCityPlanAll.addEventListener("change", (evt) => {
    allClick(evt.target, listFarmCheckBtn);
});