import { createEl } from "../common/utility.js";
import { map } from "../map/resource.js"

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
    map.on('click', memoClickEvent);
}

function memoClickEvent(evt) {
    let memoOverlay = createMemoOverlay();
    let position = memoCursorOverlay.getPosition();

    memoOverlay.setPosition(position);
    map.addOverlay(memoOverlay);

    memoComplete();
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
    cursorElement.className = 'ol-memo-cursor';

    return new ol.Overlay({
        element: cursorElement,
        offset: [0, -5],
        positioning: 'bottom-center',
        stopEvent: false,
        insertFirst: false,
    });
}

function createMemoOverlay() {
    let memoElement = document.createElement('div');
    memoElement.className = 'ol-memo';

    let closeDiv = document.createElement('div');
    closeDiv.className = "text-end";

    let contentDiv = document.createElement('div');
    contentDiv.className = "px-1";
    
    let closeBtn = document.createElement('button');
    closeBtn.className = "btn-close btn-sm";

    let contentTextarea = document.createElement('textarea');
    contentTextarea.className = "ol-memo-textarea";
    contentTextarea.rows = 3
    contentTextarea.placeholder = "텍스트를 입력해주세요";

    closeDiv.appendChild(closeBtn);
    contentDiv.appendChild(contentTextarea);

    memoElement.appendChild(closeDiv);
    memoElement.appendChild(contentDiv);

    let memoOverlay = new ol.Overlay({
        element: memoElement,
        offset: [0, -5],
        positioning: 'bottom-center',
        stopEvent: false,
        insertFirst: false,
    });

    closeBtn.addEventListener("click", (evt) => {
        map.removeOverlay(memoOverlay);
    })

    return memoOverlay;
}