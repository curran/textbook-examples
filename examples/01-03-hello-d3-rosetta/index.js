import { select } from "d3";
import { one, setter } from "d3-rosetta";
import { data } from "./data.js";

export const main = (container, { state, setState }) => {
  const svg = one(select(container), "svg")
    .attr("width", container.clientWidth)
    .attr("height", container.clientHeight)
    .style("background", "#F0FFF4");

  const circles = svg
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r)
    .attr("fill", (d) => d.fill)
    .attr("opacity", 700 / 1000);

  const { selectedDatum } = state;
  const setSelectedDatum = setter(setState, "selectedDatum");

  svg.on("click", () => setSelectedDatum(undefined));

  circles
    .style("cursor", "pointer")
    .on("click", (event, d) => {
      event.stopPropagation();
      setSelectedDatum(d === selectedDatum ? undefined : d);
    })
    .attr("stroke", "none")
    .filter((d) => d === selectedDatum)
    .attr("stroke", "black")
    .attr("stroke-width", 5)
    .raise();
};
