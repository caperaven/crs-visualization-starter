class Visualization extends HTMLElement {
    async connectedCallback() {
        this.style.position = "relative";

        await this._waitForLibrary();
        await this._load();
    }

    disconnectedCallback() {
        this.svg = null;
        this.canvas = null;
    }

    _waitForLibrary() {
        return new Promise(resolve => {
            const fn = () => {
                requestAnimationFrame(fn);

                if (globalThis.d3 != null) {
                    resolve();
                }
            };

            fn();
        });
    }

    _load() {
        return new Promise(resolve => {
            this.svg = d3.select(this)
                .append("svg")
                .style("position", "absolute")
                .style("top", "0")
                .style("left", "0")
                .style("width", "100%")
                .style("height", "100%");

            const canvas = d3.select(this)
                .append("canvas")
                .style("position", "absolute")
                .style("top", "0")
                .style("left", "0")
                .style("width", "100%")
                .style("height", "100%");

            requestAnimationFrame(() => {
                const dpr = window.devicePixelRatio || 1;
                const rect = this.getBoundingClientRect();

                canvas
                    .attr("width", rect.width * dpr)
                    .attr("height", rect.height * dpr);

                this._ctx = canvas.node().getContext("2d");
                this._ctx.scale(dpr, dpr);

                resolve();
            });
        });
    }
}

customElements.define("crs-visualization", Visualization);