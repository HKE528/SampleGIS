defineEPSG();

const daumResolutions = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];
const daumExtent = [-30000, -60000, 494288, 988576];
const KakaoNormalMapURL = "https://map{0-3}.daumcdn.net/map_2d/2106wof/L{z}/{y}/{x}.png";
const KakaoSatelliteMapURL = "https://map{0-3}.daumcdn.net/map_skyview/L{z}/{y}/{x}.jpg?v=160114";
const vworldBaseUrl = 'http://api.vworld.kr/req/wmts/1.0.0/5F043B4C-BC18-31D0-B652-0151881CD4C3/Base/{z}/{y}/{x}.png';
const vworldSatelliteUrl = 'http://api.vworld.kr/req/wmts/1.0.0/5F043B4C-BC18-31D0-B652-0151881CD4C3/Satellite/{z}/{y}/{x}.jpeg';

const kakaoProj = new ol.proj.Projection({
    code: 'EPSG:5181',
    units: 'm'
});
const kakaoGrid = new ol.tilegrid.TileGrid({
    origin: [daumExtent[0], daumExtent[1]],
    resolutions: daumResolutions,
});

const kakaoNormal = new ol.source.XYZ({
    projection: kakaoProj,
    tileGrid: kakaoGrid,

    tileUrlFunction: function (tileCoord) {
        let s = Math.floor(Math.random() * 4); // 0 ~ 3

        let level = daumResolutions.length - tileCoord[0];

        return KakaoNormalMapURL.replace('{0-3}', s)
            .replace('{z}', level.toString())
            .replace('{x}', tileCoord[1].toString())
            .replace('{y}', (-tileCoord[2] - 1).toString());
    },
});

const kakaoSatellite = new ol.source.XYZ({
    projection: kakaoProj,
    tileGrid: kakaoGrid,

    tileUrlFunction: function (tileCoord) {
        let s = Math.floor(Math.random() * 4); // 0 ~ 3

        let level = daumResolutions.length - tileCoord[0];

        return KakaoSatelliteMapURL.replace('{0-3}', s)
            .replace('{z}', level.toString())
            .replace('{x}', tileCoord[1].toString())
            .replace('{y}', (-tileCoord[2] - 1).toString());
    },
});

const vworldNormal = new ol.source.XYZ({
    url: vworldBaseUrl,
});

const vworldSatellite = new ol.source.XYZ({
    url: vworldSatelliteUrl,
});

const naverNormal = new ol.source.XYZ({
    url: "https://map.pstatic.net/nrb/styles/basic/1626941278/{z}/{x}/{y}.png?mt=bg.ol.ts.lko",
});

const naverSatellite = new ol.source.XYZ({
    url: "https://map.pstatic.net/nrb/styles/satellite/1626941278/{z}/{x}/{y}.png?mt=bg",
});

const baseMapLayer = new ol.layer.Tile({ source: vworldNormal });

const view = new ol.View({
    center: ol.proj.fromLonLat([125.1, 35.5]),
    minZoom: 6,
    maxZoom: 19,
    zoom: 6
});

const measureVector = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2,
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33',
            }),
        }),
    }),
});

const geolocationVector = new ol.layer.Vector({
    source: new ol.source.Vector(),
});

const map = new ol.Map({
    target: 'map',
    layers: [baseMapLayer, measureVector, geolocationVector],
    view: view,
    controls: [],
});

function defineEPSG() {
    proj4.defs(
        "EPSG:5181",
        "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"
    );

    ol.proj.proj4.register(proj4);
}

export {
    map, view,
    baseMapLayer,
    measureVector,
    vworldNormal,
    vworldSatellite,
    kakaoNormal,
    kakaoSatellite,
    naverNormal,
    naverSatellite,
    geolocationVector
}