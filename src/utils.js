export function waitForLibrary() {
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

export function createSvg(context) {
    return new Promise(resolve => {
        const result = d3.select(context)
            .append("svg")
            .style("position", "absolute")
            .style("top", "0")
            .style("left", "0")
            .style("width", "100%")
            .style("height", "100%");

        resolve(result);
    })
}

export function createCanvas(context) {
    return new Promise(resolve => {
        const canvas = d3.select(context)
            .append("canvas")
            .style("position", "absolute")
            .style("top", "0")
            .style("left", "0")
            .style("width", "100%")
            .style("height", "100%");

        requestAnimationFrame(() => {
            const dpr = window.devicePixelRatio || 1;
            const rect = context.getBoundingClientRect();

            canvas
                .attr("width", rect.width * dpr)
                .attr("height", rect.height * dpr);

            const result  = canvas.node().getContext("2d");
            result.scale(dpr, dpr);

            resolve(result);
        });
    })
}