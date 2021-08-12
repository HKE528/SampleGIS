import { view } from "../map/resource.js";
import {createEl} from "../common/utility.js";

const btnZoomIn = createEl("btnZoomIn");
const btnZoomOut = createEl("btnZoomOut");

btnZoomIn.addEventListener("click", zoomin);
btnZoomOut.addEventListener("click", zoomout);

function zoomin() {
    let curZoom = view.getZoom();

    view.animate({
        duration: 250,
        zoom: curZoom + 0.5
    });
}

function zoomout() {
    let curZoom = view.getZoom();

    view.animate({
        duration: 250,
        zoom: curZoom - 0.5
    });
}
