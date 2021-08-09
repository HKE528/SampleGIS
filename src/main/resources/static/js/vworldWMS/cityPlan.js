import { createVworldImageWMS, layerCheckEventHandler, allClick } from "./vworldUtility.js";
import { map } from "../map/resource.js";

const checkBtnCityPlanAll = document.getElementById("check-all-upisuq");
const checkBtnSpaceFacility = document.getElementById("check-upisuq153");
const checkBtnTrafficFacility = document.getElementById("check-upisuq152");
const checkBtnLoad = document.getElementById("check-upisuq151");
const checkBtnOtherFacility = document.getElementById("check-upisuq159");

const listCityPlanCheckBtn = [
    checkBtnSpaceFacility,      // 공간시설
    checkBtnTrafficFacility,    // 교통시설
    checkBtnLoad,               // 도로
    checkBtnOtherFacility       // 기타기반시설
]

const spaceFacilityLayers = createVworldImageWMS("spaceFacilityLayers", checkBtnSpaceFacility.value);
const trafficFacilityLayers = createVworldImageWMS("trafficFacilityLayers", checkBtnTrafficFacility.value);
const loadLayers = createVworldImageWMS("loadLayers", checkBtnLoad.value);
const otherFacilityLayers = createVworldImageWMS("otherFacilityLayers", checkBtnOtherFacility.value);

checkBtnSpaceFacility.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, spaceFacilityLayers));
checkBtnTrafficFacility.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, trafficFacilityLayers));
checkBtnLoad.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, loadLayers));
checkBtnOtherFacility.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, otherFacilityLayers));

checkBtnCityPlanAll.addEventListener("change", (evt) => {
    allClick(evt.target, listCityPlanCheckBtn);
});