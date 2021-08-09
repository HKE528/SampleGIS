import { createVworldImageWMS, layerCheckEventHandler, allClick } from "./vworldUtility.js";
import { map } from "../map/resource.js";

const checkBtnGroundAll = document.getElementById("check-all-gr");
const checkBtnBusinessDistrict = document.getElementById("check-lhzone");
const checkBtnLandRegistration1 = document.getElementById("check-bubun");
const checkBtnLandRegistration2 = document.getElementById("check-bonbun");

const listGroundCheckBtn = [
    checkBtnBusinessDistrict,    //사업지구경계도
    checkBtnLandRegistration1,   //지적도1
    checkBtnLandRegistration2,   //지적도2
]

const businessDistrictLayers = createVworldImageWMS("businessDistrictLayers", checkBtnBusinessDistrict.value);
const landRegistrationLayers1 = createVworldImageWMS("landRegistrationLayers1", checkBtnLandRegistration1.value);
const landRegistrationLayers2 = createVworldImageWMS("landRegistrationLayers2", checkBtnLandRegistration2.value);

checkBtnBusinessDistrict.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, businessDistrictLayers));
checkBtnLandRegistration1.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, landRegistrationLayers1));
checkBtnLandRegistration2.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, landRegistrationLayers2));

checkBtnGroundAll.addEventListener("change", (evt) => {
    allClick(evt.target, listGroundCheckBtn);
});