import { view } from "../resource.js"

const btnZoomIn = document.getElementById("btnZoomIn");
const btnZoomOut = document.getElementById("btnZoomOut");

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