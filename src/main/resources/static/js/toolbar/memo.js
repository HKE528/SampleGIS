import {createEl} from "../common/utility.js";
import {map} from "../map/resource.js"

const memoBtn = createEl("utilMemo");
memoBtn.addEventListener("click", btnEvent);

const memoCursorOverlay = createCursor();
map.addOverlay(memoCursorOverlay);

function btnEvent(evt) {
    this.classList.toggle("active");

    if (this.classList.contains("active")) {
        memoStart();
    } else {
        memoComplete();
    }
}

function memoStart() {
    map.on('pointermove', pointerMoveHandler);
}

function memoComplete() {
    memoBtn.classList.remove("active");
    map.un('pointermove', pointerMoveHandler);

    memoCursorOverlay.setPosition(null);
}

function pointerMoveHandler(evt) {
    memoCursorOverlay.setPosition(evt.coordinate);
}

function createCursor() {
    let cursorElement = document.createElement('div');
    cursorElement.className = 'ol-tooltip ol-tooltip-measure';

    let cursorOverlay = new ol.Overlay({
        element: cursorElement,
        offset: [0, -5],
        positioning: 'bottom-center',
        stopEvent: false,
        insertFirst: false,
    });

    return cursorOverlay;
}