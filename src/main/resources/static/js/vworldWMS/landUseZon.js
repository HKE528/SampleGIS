import { createVworldImageWMS, layerCheckEventHandler, allClick } from "./vworldUtility.js";
import { map } from "../map/resource.js";

const checkBtnUseZonAll = document.getElementById("check-all-uq");
const checkBtnLimitDevelopment = document.getElementById("check-ud801");
const checkBtnPromotionDevelopment = document.getElementById("check-uq129");
const checkBtnManagementArea = document.getElementById("check-uq112");
const checkBtnCountryPlan = document.getElementById("check-uq141");

const checkBtnAgriculturalArea = document.getElementById("check-uq113");
const checkBtnCitylArea = document.getElementById("check-uq111");
const checkBtnProtectionlArea = document.getElementById("check-uq126");
const checkBtnSpecificLimitArea = document.getElementById("check-uq130");
const checkBtnHotSpringArea = document.getElementById("check-uj401");

const listUseZonCheckBtn = [
    checkBtnLimitDevelopment,       // 개발제한구역
    checkBtnPromotionDevelopment,   // 개발진흥지구
    checkBtnManagementArea,         // 관리지역
    checkBtnCountryPlan,            // 국토계획구역
    checkBtnAgriculturalArea,       // 농림지역

    checkBtnCitylArea,              // 도시지역
    checkBtnProtectionlArea,        // 보호지구
    checkBtnSpecificLimitArea,      // 특정용도제한지구
    checkBtnHotSpringArea           // 온천지구
]

const limitDevelopmentLayers = createVworldImageWMS("limitDevelopmentLayers", checkBtnLimitDevelopment.value);
const promotionDevelopmentLayers = createVworldImageWMS("promotionDevelopmentLayers", checkBtnPromotionDevelopment.value);
const managementAreaLayers = createVworldImageWMS("managementAreaLayers", checkBtnManagementArea.value);
const countryPlanLayers = createVworldImageWMS("countryPlanLayers", checkBtnCountryPlan.value);
const agriculturalAreaLayers = createVworldImageWMS("agriculturalAreaLayers", checkBtnAgriculturalArea.value);

const citylAreaLayers = createVworldImageWMS("citylAreaLayers", checkBtnCitylArea.value);
const protectionlAreaLayers = createVworldImageWMS("protectionlAreaLayers", checkBtnProtectionlArea.value);
const specificLimitAreaLayers = createVworldImageWMS("specificLimitAreaLayers", checkBtnSpecificLimitArea.value);
const hotSpringAreaLayers = createVworldImageWMS("hotSpringAreaLayers", checkBtnHotSpringArea.value);

checkBtnLimitDevelopment.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, limitDevelopmentLayers));
checkBtnPromotionDevelopment.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, promotionDevelopmentLayers));
checkBtnManagementArea.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, managementAreaLayers));
checkBtnCountryPlan.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, countryPlanLayers));
checkBtnAgriculturalArea.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, agriculturalAreaLayers));

checkBtnCitylArea.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, citylAreaLayers));
checkBtnProtectionlArea.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, protectionlAreaLayers));
checkBtnSpecificLimitArea.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, specificLimitAreaLayers));
checkBtnHotSpringArea.addEventListener("change", (evt) => layerCheckEventHandler(map, evt.target, hotSpringAreaLayers));

checkBtnUseZonAll.addEventListener("change", (evt) => {
    allClick(evt.target, listUseZonCheckBtn);
});