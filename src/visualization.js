import {waitForLibrary, createSvg, createCanvas} from "./utils.js";

class Visualization extends HTMLElement {
    async connectedCallback() {
        this.style.position = "relative";

        await waitForLibrary();
        this._svg = await createSvg(this);
        this._ctx = await createCanvas(this);

        this.dispatchEvent(new CustomEvent("ready"));
    }

    disconnectedCallback() {
        this._svg = null;
        this._ctx = null;
    }

    setData(data) {
        console.log(data);
    }
}

customElements.define("crs-visualization", Visualization);