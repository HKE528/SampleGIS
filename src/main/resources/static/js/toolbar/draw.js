import { allBtnUnactive, btnChanger, setBtnsEventHandeler } from "../common/commonBtnFunction.js"
import { createEl } from "../common/utility.js"
import { map, drawVector } from "../map/resource.js"

const drawPoint = createEl("drawPoint");
const drawLine = createEl("drawLine");
const drawPolygon = createEl("drawPolygon");
const drawFreehand = createEl("drawFreehand");
const drawClear = createEl("drawClear");

const drawBtnList = [drawPoint, drawLine, drawPolygon, drawFreehand, drawClear];
setBtnsEventHandeler(drawBtnList, clickDraw);

const pointDraw = createDraw("Point");
const lineDraw = createDraw("LineString");
const polygonDraw = createDraw("Polygon");
const freehandDraw = createFreeHandDraw("LineString");
const drawList = [pointDraw, lineDraw, polygonDraw, freehandDraw];

function clickDraw() {
    removeAllDrawInterction();
    btnChanger(drawBtnList, this);

    if (this.classList.contains("active") && this != drawClear) {
        drawStart(this);
    } else {
        clearDraw();
    }
}

function drawStart(btn) {
    let draw;
    switch (btn) {
        case drawPoint:
            draw = pointDraw;
            break;

        case drawLine:
            draw = lineDraw;
            break;

        case drawPolygon:
            draw = polygonDraw;
            break;

        case drawFreehand:
            draw = freehandDraw;
            break;
    }

    map.addInteraction(draw);
}

function clearDraw() {
    drawClear.classList.remove("active");
    allBtnUnactive(drawBtnList);

    drawVector.getSource().clear();
}

function removeAllDrawInterction() {
    drawList.forEach(it => {
        map.removeInteraction(it);
    })
}

function createDraw(type) {
    return new ol.interaction.Draw({
        source: drawVector.getSource(),
        type: type,
        // style: new ol.style.Style({
        //     fill: new ol.style.Fill({
        //         color: 'rgba(200, 0, 0, 0.2)',
        //     }),
        //     stroke: new ol.style.Stroke({
        //         color: 'rgba(200, 0, 0, 0.7)',
        //         lineDash: [10, 10],
        //         width: 2,
        //     }),
        //     image: new ol.style.Circle({
        //         radius: 4,
        //         stroke: new ol.style.Stroke({
        //             color: 'rgba(200, 0, 0, 0.8)',
        //             width: 3
        //         }),
        //         fill: new ol.style.Fill({
        //             color: 'rgba(255, 255, 255, 0.5)',
        //         }),
        //     }),
        // }),
    });
}

function createFreeHandDraw(type) {
    return new ol.interaction.Draw({
        source: drawVector.getSource(),
        type: type,
        freehand: true,
        // style: new ol.style.Style({
        //     fill: new ol.style.Fill({
        //         color: 'rgba(200, 0, 0, 0.2)',
        //     }),
        //     stroke: new ol.style.Stroke({
        //         color: 'rgba(200, 0, 0, 0.7)',
        //         lineDash: [10, 10],
        //         width: 2,
        //     }),
        //     image: new ol.style.Circle({
        //         radius: 4,
        //         stroke: new ol.style.Stroke({
        //             color: 'rgba(200, 0, 0, 0.8)',
        //             width: 3
        //         }),
        //         fill: new ol.style.Fill({
        //             color: 'rgba(255, 255, 255, 0.5)',
        //         }),
        //     }),
        // }),
    });
}