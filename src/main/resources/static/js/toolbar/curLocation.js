import { view, geolocationVector } from "../map/resource.js";
import {createEl} from "../common/utility.js";

const geolocationBtn = createEl('btnCurLocation');
const myModal = new bootstrap.Modal(createEl('geolocationFailModal'));

const toastContent = createEl('toastContent');
const toast = new bootstrap.Toast(createEl('liveToast'));

const geolocation = new ol.Geolocation({
    // enableHighAccuracy must be set to true to have the heading value.
    trackingOptions: {
        enableHighAccuracy: true,
    },

    projection: view.getProjection(),
});

const positionFeature = new ol.Feature();   //위치 표시
const accuracyFeature = new ol.Feature();   //오차범위 표시

positionFeature.setStyle(
    new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: '#3399CC',
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 2,
            }),
        }),
    })
);

geolocation.on('change:position', function () {
    const coordinates = geolocation.getPosition();
    positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);

    view.animate({
        duration: 250,
        zoom: (view.getZoom() > 15)? view.getZoom() : 15,
        center: coordinates
    });
});

geolocation.on('change:accuracyGeometry', function () {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());

    toastContent.innerHTML = "실제 위치와 " + geolocation.getAccuracy() + 'm 정도 차이날 수 있습니다.';
    toast.show();
});

geolocation.on('error', function (error) {
    myModal.show();
});

geolocationBtn.addEventListener('change', function () {
    geolocation.setTracking(this.checked);

    if (!this.checked) {
        positionFeature.setGeometry(null);
        accuracyFeature.setGeometry(null);
    }
});

geolocationVector.getSource().addFeatures([positionFeature, accuracyFeature]);
