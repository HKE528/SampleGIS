import { map, measureVector } from "../map/resource.js";

function createContent(targetFeatures, targetOverlay, type, content) {
    let text;
    if (type == 'Polygon') {
        text = "총 면적: ";
    } else if (type == 'LineString') {
        text = "총 길이: ";
    } else if (type == 'Circle') {
        text = "반경: ";
    }
    // text += "<b>" + content + "</b>";
    text += content;
    
    let contentDiv = document.createElement('div');
    contentDiv.className = 'ol-tooltip ol-tooltip-static text-center';

    let textContent = document.createElement('p');
    textContent.className = "fs-6";
    textContent.innerHTML = text;

    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-outline-light btn-sm';
    deleteBtn.innerHTML = "삭제하기"

    contentDiv.appendChild(textContent);
    contentDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", (evt) => {
        targetFeatures.forEach(it => {
            measureVector.getSource().removeFeature(it);
        });
        map.removeOverlay(targetOverlay)
    });

    return contentDiv;
}

function createMeasureOverlay(position) {
    let measureOverlay = new ol.Overlay({
        offset: [0, -7],
        position: position,
        positioning: 'bottom-center',
        stopEvent: false,
        insertFirst: false,
    });

    return measureOverlay;
}

function createMeasureTooltip() {
    let measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';

    let measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
        stopEvent: false,
        insertFirst: false,
    });

    return measureTooltip;
}

function createHelpTooltip() {
    let helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'ol-tooltip';

    let helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left',
    });

    return helpTooltip;
}

function formatLength(line) {
    const length = ol.sphere.getLength(line);
    
    let output;
    
    if (length > 1000) {
        let num = Math.round((length / 1000) * 100) / 100;
        output = "<b>" + num.toLocaleString() + "</b> km";
    } else {
        let num = Math.round(length * 100) / 100;
        output = "<b>" + num.toLocaleString() + "</b> m";
    }

    return output;
}

function formatArea(polygon) {
    const area = ol.sphere.getArea(polygon);
    // const area = polygon.getArea(polygon);

    let output;
    if (area > 1000000) {
        let num = Math.round((area / 1000000) * 100) / 100;
        output = "<b>" + num.toLocaleString() + "</b> km<sup>2</sup>";
    } else {
        let num = Math.round(area * 100) / 100;
        output = "<b>" + num.toLocaleString() + "</b> m<sup>2</sup>";
    }

    return output;
}

function generateDraw(type) {
    return new ol.interaction.Draw({
        source: measureVector.getSource(),
        type: type,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(200, 0, 0, 0.2)',
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(200, 0, 0, 0.7)',
                lineDash: [10, 10],
                width: 2,
            }),
            image: new ol.style.Circle({
                radius: 4,
                stroke: new ol.style.Stroke({
                    color: 'rgba(200, 0, 0, 0.8)',
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.5)',
                }),
            }),
        }),
    });
}

export {
    createMeasureOverlay,
    createHelpTooltip,
    createMeasureTooltip,
    formatArea,
    formatLength,
    generateDraw,
    createContent
}