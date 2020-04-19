import * as d3 from "d3";

class BubbleChart {
  constructor(element, data) {
    this.element = element;
    console.log(data);
    // let dataset = { children: data[5].districtData };
    let dataset = { children: data.filter(d => d.state !== "Total") };
    let diameter = 750;
    let color = d3
      .scaleOrdinal()
      .range([
        "red",
        "green",
        "blue",
        "#6b486b",
        "#a05d56",
        "#d0743c",
        "#ff8c00"
      ]);

    let bubble = d3
      .pack(dataset)
      .size([diameter, diameter])
      .padding(5);

    let svg = d3
      .select(element.current)
      .append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");

    let nodes = d3.hierarchy(dataset).sum(function(d) {
      return d.confirmed;
    });

    let node = svg
      .selectAll(".node")
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function(d) {
        return !d.children;
      })
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    node.append("title").text(function(d) {
      return d.data.state + ": " + d.data.confirmed;
    });

    node
      .append("circle")
      .attr("r", function(d) {
        return d.r;
      })
      .style("fill", function(d, i) {
        return color(i);
      });

    node
      .append("text")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      .text(function(d) {
        return d.data.state.substring(0, d.r / 3);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function(d) {
        return d.r / 5;
      })
      .attr("fill", "white");

    node
      .append("text")
      .attr("dy", "1.3em")
      .style("text-anchor", "middle")
      .text(function(d) {
        return d.data.confirmed;
      })
      .attr("font-family", "Gill Sans", "Gill Sans MT")
      .attr("font-size", function(d) {
        return d.r / 5;
      })
      .attr("fill", "white");

    d3.select(window.frameElement).style("height", diameter + "px");
  }
}

export default BubbleChart;
