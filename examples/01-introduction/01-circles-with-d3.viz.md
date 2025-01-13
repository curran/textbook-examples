**index.html**

```html
<!DOCTYPE html>
<!-- The lang attribute specifies the language of the document ("en" = English) -->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- The viewport meta tag ensures the web page is responsive on all devices -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- The title tag sets the title displayed in the browser tab -->
    <title>Circles with D3</title>
    <style>
      body,
      html,
      #viz-container {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    </style>
    <script type="importmap">
      { "imports": { "d3": "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm" } }
    </script>
  </head>
  <body>
    <div id="viz-container"></div>
    <script type="module">
      import { main } from "./index.js";
      main(document.getElementById("viz-container"));
    </script>
  </body>
</html>
```

**index.js**

```javascript
import { select } from "d3";
import { data } from "./data.js";

export const main = (container) => {
  const svg = select(container)
    .selectAll("svg")
    .data([null])
    .join("svg")
    .attr("width", container.clientWidth)
    .attr("height", container.clientHeight)
    .style("background", "#F0FFF4");

  svg
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r)
    .attr("fill", (d) => d.fill)
    .attr("opacity", 700 / 1000);
};
```

**data.js**

```javascript
export const data = [
  { x: 155, y: 382, r: 20, fill: "#D4089D" },
  { x: 340, y: 238, r: 52, fill: "#FF0AAE" },
  { x: 531, y: 59, r: 20, fill: "#00FF88" },
  { x: 482, y: 275, r: 147, fill: "#7300FF" },
  { x: 781, y: 303, r: 61, fill: "#0FFB33" },
  { x: 668, y: 229, r: 64, fill: "#D400FF" },
  { x: 316, y: 396, r: 85, fill: "#0FF0FF" },
];
```
