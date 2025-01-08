import { select } from "d3";

const data = [
  { x: 155, y: 382, r: 20, fill: "#D4089D" },
  { x: 340, y: 238, r: 52, fill: "#FF0AAE" },
  { x: 531, y: 59, r: 20, fill: "#00FF88" },
  { x: 482, y: 275, r: 147, fill: "#7300FF" },
  { x: 781, y: 303, r: 61, fill: "#0FFB33" },
  { x: 668, y: 229, r: 64, fill: "#D400FF" },
  { x: 316, y: 396, r: 85, fill: "#0FF0FF" },
];

// Assign ids to the data using the index.
data.forEach((d, i) => {
  d.id = i;
});

export const main = (container, { state, setState }) => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const svg = select(container)
    .selectAll("svg")
    .data([null])
    .join("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "#F0FFF4");

  const circles = svg
    .selectAll("circle")
    // The second argument to data is the key function.
    .data(data, (d) => d.id)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r)
    .attr("fill", (d) => d.fill)
    .attr("opacity", 700 / 1000)
    // Use the pointer cursor as an affordance for click interaction.
    .style("cursor", "pointer")
    .attr("stroke", "none");

  // State management for the selected circle.
  const setSelectedId = (clickedId) => {
    setState((state) => {
      // Clicking on the selected circle again unselects it.
      const selectedId = clickedId === state.selectedId ? undefined : clickedId;
      return { ...state, selectedId };
    });
  };
  const { selectedId } = state;

  // Clicking on a circle selects it
  circles.on("click", (event, d) => {
    // Don't let the SVG element handle the click event.
    event.stopPropagation();

    // Update the selected circle.
    setSelectedId(d.id);
  });

  // Clicking on the background highlights nothing.
  svg.on("click", () => {
    setSelectedId(undefined);
  });

  // Put the selected circle on the top.
  circles
    .filter((d) => d.id === selectedId)
    .attr("stroke", "black")
    .attr("stroke-width", 5)
    .raise();
};
