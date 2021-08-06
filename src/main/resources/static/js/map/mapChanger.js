import {
    baseMapLayer,
    vworldNormal,
    vworldSatellite,
    kakaoNormal,
    kakaoSatellite,
    naverNormal,
    naverSatellite
} from "./resource.js";

const vworldNormalRadio = document.getElementById('vworldNormal');
const vworldSatelliteRadio = document.getElementById('vworldSatellite');
const KakaoNormalRadio = document.getElementById('KakaoNormal');
const kakaoSatelliteRadio = document.getElementById('kakaoSatellite');
const naverNormalRadio = document.getElementById('naverNormal');
const naverSatelliteRadio = document.getElementById('naverSatellite');

vworldNormalRadio.addEventListener("click", changeMap);
vworldSatelliteRadio.addEventListener("click", changeMap);
KakaoNormalRadio.addEventListener("click", changeMap);
kakaoSatelliteRadio.addEventListener("click", changeMap);
naverNormalRadio.addEventListener("click", changeMap);
naverSatelliteRadio.addEventListener("click", changeMap);

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