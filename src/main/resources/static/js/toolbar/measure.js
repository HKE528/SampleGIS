import { map, measureVector } from "../map/resource.js"
import { createContent, createHelpTooltip, createMeasureOverlay, createMeasureTooltip, formatArea, formatLength, formatRadius, generateDraw } from "./measureFunction.js"

const distanceBtn = document.getElementById("distanceBtn");
const extentBtn = document.getElementById("extentBtn");
const radiusBtn = document.getElementById("radiusBtn");

distanceBtn.addEventListener("click", clickHendler);
extentBtn.addEventListener("click", clickHendler);
radiusBtn.addEventListener("click", clickHendler);

const btnList = [distanceBtn, extentBtn, radiusBtn];
const snap = new ol.interaction.Snap({
    source: measureVector.getSource(),
});


let mousePosition;

let sketch;

let draw;
let circleLineDraw;

let helpTooltip = createHelpTooltip();
let measureTooltip = createMeasureTooltip();
map.addOverlay(helpTooltip);
map.addOverlay(measureTooltip);

function clickHendler(evt) {
    endMeasure();

    btnChanger(this);

    if (this.classList.contains("active")) {
        measureStart(this);
    }
}

function measureStart(btn) {
    map.on('pointermove', pointerMoveHandler);

    let type;

    if(btn == distanceBtn) {
        type = "LineString";
    } else if (btn == extentBtn) {
        type = "Polygon";
    } else if (btn == radiusBtn) {
        type = "Circle";
    }

    addInteraction(type);
}

function pointerMoveHandler(evt) {
    if (evt.dragging) {
        return;
    }

    let helpMsg = '클릭하여 시작';

    if (sketch) {
        let geom = sketch.getGeometry();

        if (geom instanceof ol.geom.Circle) {
            helpMsg = '클릭하여 종료';
        } else {
            helpMsg = '더블클릭하여 종료';
        }
    }

    helpTooltip.getElement().innerHTML = helpMsg;
    helpTooltip.setPosition(evt.coordinate);

    mousePosition = evt.coordinate;
}

function addInteraction(type) {
    if(type == "Circle"){
        circleLineDraw = generateDraw("LineString");
        map.addInteraction(circleLineDraw);
    }

    draw = generateDraw(type);
    map.addInteraction(draw);
    map.addInteraction(snap);

    let listener;
    draw.on('drawstart', function (evt) {
        sketch = evt.feature;

        let tooltipCoord = evt.coordinate;

        listener = sketch.getGeometry().on('change', function (evt) {
            const geom = evt.target;

            let output;
            if (geom instanceof ol.geom.Polygon) {
                output = formatArea(geom);
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof ol.geom.LineString) {
                output = formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();
            } else if (geom instanceof ol.geom.Circle) {
                output = formatRadius(geom);
                tooltipCoord = mousePosition;
            }

            measureTooltip.getElement().innerHTML = output;
            measureTooltip.setPosition(tooltipCoord);
        });
    });

    draw.on('drawend', function (evt) {
        let endPosition = measureTooltip.getPosition();
        let targetFeatures = [evt.feature];

        if (type == 'Circle') {
            let geom = evt.feature.getGeometry();
            let center = geom.getCenter();

            let centerPoint = new ol.Feature({
                geometry: new ol.geom.Point(center)
            });

            let radiusLine = new ol.Feature({
                geometry: new ol.geom.LineString([center, endPosition])
            });

            measureVector.getSource().addFeatures([centerPoint, radiusLine]);

            targetFeatures.push(centerPoint, radiusLine);
        }

        let measureOverlay = createMeasureOverlay(endPosition);
        let contentelem = createContent(targetFeatures, measureOverlay, type, measureTooltip.getElement().innerHTML);
        measureOverlay.setElement(contentelem);

        map.addOverlay(measureOverlay);

        ol.Observable.unByKey(listener);

        endMeasure();
        allBtnUnactive();
    });
}

function allBtnUnactive() {
    btnList.forEach(it => {
        it.classList.remove("active");
    });
}

function btnChanger(curBtn) {
    btnList.forEach(it => {
        if (it != curBtn) it.classList.remove("active");
    });

    curBtn.classList.toggle("active")
}

function endMeasure() {
    sketch = null;
    helpTooltip.setPosition(null);
    measureTooltip.setPosition(null);

    map.removeInteraction(draw);
    map.removeInteraction(circleLineDraw);
    map.removeInteraction(snap);

    draw = null;
    circleLineDraw = null;

    map.un('pointermove', pointerMoveHandler);
}
