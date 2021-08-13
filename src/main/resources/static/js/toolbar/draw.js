import { allBtnUnactive, btnChanger, setBtnsEventHandeler } from "../common/commonBtnFunction.js"
import { createEl } from "../common/utility.js"
import { map, drawVector } from "../map/resource.js"

const drawPoint = createEl("drawPoint");
const drawLine = createEl("drawLine");
const drawPolygon = createEl("drawPolygon");
const drawFreehand = createEl("drawFreehand");
const drawEraser = createEl("drawEraser");
const drawClear = createEl("drawClear");

const drawBtnList = [drawPoint, drawLine, drawPolygon, drawFreehand, drawEraser, drawClear];
setBtnsEventHandeler(drawBtnList, clickDraw);

const pointDraw = createDraw("Point");
const lineDraw = createDraw("LineString");
const polygonDraw = createDraw("Polygon");
const freehandDraw = createFreeHandDraw("LineString");
const eraserDraw = createEraser();
const drawList = [pointDraw, lineDraw, polygonDraw, freehandDraw, eraserDraw];

eraseFeature();

function clickDraw() {
    removeAllDrawInterction();
    btnChanger(drawBtnList, this);

    if (this.classList.contains("active") && this != drawClear) {
        drawStart(this);
    } else if (this == drawClear) {
        clearDraw();
    }
}

function eraseFeature() {
    eraserDraw.on('drawstart', function (evt) {
        map.on('pointermove', findFeature);    
    });

    eraserDraw.on('drawend', function (evt) {
        map.un('pointermove', findFeature);
    });
}

function findFeature(evt){
    let curPixel = evt.pixel;

    if (map.hasFeatureAtPixel(curPixel)) {
        let findFeatures = map.getFeaturesAtPixel(curPixel);

        // console.log(findFeature);

        findFeatures.forEach(it => {
            drawVector.getSource().removeFeature(it);
        });
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

        case drawEraser:
            draw = eraserDraw;
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

function createEraser() {
    return new ol.interaction.Draw({
        type: 'LineString',
        freehand: true,
        style: new ol.style.Style(),
    });
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