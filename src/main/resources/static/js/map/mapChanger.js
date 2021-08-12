import {setBtnsEventHandeler} from "../common/commonBtnFunction.js";
import {createEl} from "../common/utility.js" ;
import {
    baseMapLayer,
    vworldNormal,
    vworldSatellite,
    kakaoNormal,
    kakaoSatellite,
    naverNormal,
    naverSatellite
} from "./resource.js";

const vworldNormalRadio = createEl('vworldNormal');
const vworldSatelliteRadio = createEl('vworldSatellite');
const KakaoNormalRadio = createEl('KakaoNormal');
const kakaoSatelliteRadio = createEl('kakaoSatellite');
const naverNormalRadio = createEl('naverNormal');
const naverSatelliteRadio = createEl('naverSatellite');

const mapBtnList = [vworldNormalRadio, vworldSatelliteRadio, KakaoNormalRadio, kakaoSatelliteRadio, naverNormalRadio, naverSatelliteRadio];
setBtnsEventHandeler(mapBtnList, changeMap);

function changeMap() {
    let type = this.value;

    switch (type) {
        case 'vworldNormal':
            baseMapLayer.setSource(vworldNormal);
            break;
        case 'vworldSatellite':
            baseMapLayer.setSource(vworldSatellite);
            break;
        case 'KakaoNormal':
            baseMapLayer.setSource(kakaoNormal);
            break;
        case 'kakaoSatellite':
            baseMapLayer.setSource(kakaoSatellite);
            break;
        case 'naverNormal':
            baseMapLayer.setSource(naverNormal);
            break;
        case 'naverSatellite':
            baseMapLayer.setSource(naverSatellite);
            break;
    }
}