const vworldKey = '5F043B4C-BC18-31D0-B652-0151881CD4C3';

const baseURL = 'http://api.vworld.kr/req/wms?key=' + vworldKey + '&';

function createVworldImageWMS(key, layer) {
    return new ol.layer.Image({
        key: key,
        source: new ol.source.ImageWMS({
            url: baseURL,
            params: {
                'request': 'GetMap',
                'layers': layer,
                // 'styles': layer
            },
            ratio: 1,
        }),
    });
}

function layerCheckEventHandler(map, target, layer) {
    if (target.checked) {
        map.addLayer(layer);
    } else {
        map.removeLayer(layer)
    }
}

function allClick(targetList) {
    targetList.forEach(element => {
        element.click();
    });
}

export {
    createVworldImageWMS,
    layerCheckEventHandler,
    allClick
}