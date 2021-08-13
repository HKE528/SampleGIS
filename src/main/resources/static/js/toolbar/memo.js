import {createEl} from "../common/utility.js";
import {map} from "../map/resource.js"

const memoBtn = createEl("utilMemo");
memoBtn.addEventListener("click", btnEvent);

function btnEvent(evt) {
    this.classList.toggle("active");
}
