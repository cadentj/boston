import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import * as d3 from "d3";

const MARGIN = 150;

const Dendrogram = forwardRef(({ width, height, data, initialSection }, ref) => {
  // console.log(data)
  const [allNodes, setAllNodes] = useState([]);
  const [allEdges, setAllEdges] = useState([]);
  const [revealedStack, setRevealedStack] = useState([0]);
  const nodesRef = useRef(null);
  const edgesRef = useRef(null);

  useEffect(() => {
    const hierarchy = d3.hierarchy(data).sum((d) => d.value);
    const radius = Math.min(width, height) / 2 - MARGIN;

    const dendrogramGenerator = d3.cluster().size([360, radius]);
    const dendrogram = dendrogramGenerator(hierarchy);

    const nameToNodeMap = {};
    dendrogram.descendants().forEach((node) => {
      nameToNodeMap[node.data.name] = node;
    });

    const radiusVariation = 0.2;

    const nodes = dendrogram.descendants().map((node) => {
      const isBossNode = node.depth === 0;
      const turnLabelUpsideDown = node.x > 180 || isBossNode;

      const variation = 1 + (Math.random() - 0.5) * 2 * radiusVariation;
      const adjustedRadius = node.y * variation;
      const x = adjustedRadius * Math.cos((node.x - 90) * (Math.PI / 180));
      const y = adjustedRadius * Math.sin((node.x - 90) * (Math.PI / 180));

      return (
        <g
          key={node.id}
          transform={`translate(${x}, ${y})`}
          data-node={JSON.stringify(node.data)} // Store the entire data object
        >
          <circle
            cx={0}
            cy={0}
            r={isBossNode ? 10 : 5}
            stroke="transparent"
            fill={isBossNode ? "red" : "#69b3a2"}
            style={{
              opacity: (isBossNode || node.data.section === initialSection) ? 1 : 0
            }}
          />
          {/* Always render the label, but differentiate the boss node */}
          <text
            x={turnLabelUpsideDown ? -15 : 15}
            y={0}
            fontSize={isBossNode ? "16px" : "12px"} // Bigger font size for boss node
            textAnchor={turnLabelUpsideDown ? "end" : "start"}
            alignmentBaseline="middle"
            style={{ opacity: (isBossNode || node.data.section === initialSection) ? 1 : 0 }}
          >
            {node.data.name}
          </text>
        </g>
      );
    });


    const linksGenerator = d3
      .lineRadial()
      .radius((d) => d.y)
      .angle((d) => (d.x / 180) * Math.PI)

    const edges = dendrogram
      .descendants() // find all nodes of the tree
      .filter((node) => node.data.type === "leaf" && node.data.links.length > 0) // keep only leaves that have links
      .map((sourceNode, i) => {
        return sourceNode.data.links.map((targetNodeName) => {
          // Loop through all the links we need to draw
          const traversedNodes = sourceNode.path(nameToNodeMap[targetNodeName]); // The path function provides a list of all the nodes we need to traverse from source to target!

          const traversedCoords = traversedNodes.map((node) => {
            // Find the coordinates of all nodes on the way
            return { x: node.x, y: node.y };
          });

          return (
            <path
              key={i}
              fill="none"
              stroke="grey"
              d={linksGenerator(traversedCoords)} // transform the list of coordinates to an SVG path
              style={{ opacity: 0 }}
            />
          );
        });
      });

    setAllNodes(nodes);
    setAllEdges(edges);
  }, [data, width, height]);

  const [revealedSections, setRevealedSections] = useState(new Set());

  useEffect(() => {
    if (initialSection) {
      revealNodes(initialSection);
    }
  }, [initialSection]); // Depend on initialSection to reveal nodes on component mount

  const revealNodes = (sectionName) => {
    // Update revealed sections
    setRevealedSections(prev => new Set([...prev, sectionName]));

    // Select and style nodes of previously revealed sections
    d3.select(nodesRef.current).selectAll("g")
      .filter(function () {
        const nodeData = JSON.parse(this.getAttribute('data-node'));
        return revealedSections.has(nodeData.section) && nodeData.section !== sectionName;
      })
      .select("circle")
      .transition()
      .style("fill", "grey");

    // Reveal nodes and edges of the current section
    const nodeSelection = d3.select(nodesRef.current).selectAll("g")
      .filter(function () {
        const nodeData = JSON.parse(this.getAttribute('data-node'));
        return nodeData.section === sectionName;
      });

    nodeSelection.select("circle").transition().style("opacity", 1).style("fill", "#69b3a2");
    nodeSelection.select("text").transition().style("opacity", 1); // Ensure labels are visible

    // Reveal edges connected to the nodes of the current section
    d3.select(edgesRef.current).selectAll("path")
      .filter(function () {
        // Logic to filter paths connected to the current section's nodes
        // You might need to adjust this based on your data structure
        return /* condition to check if path is connected to nodes of current section */;
      })
      .transition()
      .style("opacity", 1); // Adjust as needed to make edges visible
  };


  // Modified hideNodes function
  const hideNodes = (sectionName) => {
    const nodeSelection = d3.select(nodesRef.current).selectAll("g")
      .filter(function () {
        const nodeData = JSON.parse(this.getAttribute('data-node'));
        return nodeData.section === sectionName;
      });

    nodeSelection.select("circle").transition().style("opacity", 0);
    nodeSelection.select("text").transition().style("opacity", 0); // Keep labels visible
  };

  useImperativeHandle(ref, () => ({
    revealNodes,
    hideNodes
  }));

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2 + MARGIN / 2}, ${height / 2 + MARGIN / 2})`}>
          <g ref={edgesRef}>{allEdges}</g>
          <g ref={nodesRef}>{allNodes}</g>
        </g>
      </svg>
    </div>
  );
});

export default Dendrogram;
