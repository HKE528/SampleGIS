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
    });
}

function createFreeHandDraw(type) {
    return new ol.interaction.Draw({
        source: drawVector.getSource(),
        type: type,
        freehand: true,
    });
}