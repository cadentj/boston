import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import * as d3 from "d3";

const MARGIN = 150;

const Dendrogram = forwardRef(({ width, height, data, initialSection }, ref) => {
  const [allNodes, setAllNodes] = useState([]);
  const [allEdges, setAllEdges] = useState([]);
  const nodesRef = useRef(null);
  const edgesRef = useRef(null);
  const [revealedSections, setRevealedSections] = useState(new Set());

  useEffect(() => {
    const hierarchy = d3.hierarchy(data).sum((d) => d.value);
    const radius = Math.min(width, height) / 2 - MARGIN;

    const dendrogramGenerator = d3.cluster().size([360, radius]);
    const dendrogram = dendrogramGenerator(hierarchy);

    const nameToNodeMap = {};
    dendrogram.descendants().forEach((node) => {
      nameToNodeMap[node.data.name] = node;
    });


    const positionRadius = {
      1: radius * 0.5, // Close
      2: radius * 0.75, // Middle
      3: radius // Far
    };
    const nodes = dendrogram.descendants().map((node) => {

      const isBossNode = node.depth === 0;
      const turnLabelUpsideDown = node.x > 180 || isBossNode;

      // Use the node's position value to determine its radius
      const nodePosition = node.data.value;
      const adjustedRadius = positionRadius[nodePosition] || radius;

      const x = adjustedRadius * Math.cos((node.x - 90) * (Math.PI / 180));
      const y = adjustedRadius * Math.sin((node.x - 90) * (Math.PI / 180));

      return (
        <g
          key={node.id}
          transform={isBossNode ? `translate(${0}, ${0})` : `translate(${x}, ${y})`}
          data-node={JSON.stringify(node.data)} // Store the entire data object
        >
          {isBossNode && <circle
            cx={0}
            cy={0}
            r={30}
            stroke="transparent"
            fill={"white"}
            style={{
              opacity: (isBossNode || node.data.section === initialSection) ? 1 : 0
            }}
          />}
          {/* Always render the label, but differentiate the boss node */}
          <text
            x={isBossNode ? 13 : (turnLabelUpsideDown ? -10 : 10)}
            y={10}
            fontSize={isBossNode ? "16px" : "12px"} // Bigger font size for boss node
            textAnchor={turnLabelUpsideDown ? "end" : "start"}
            alignmentBaseline="middle"
            fill={isBossNode ? "red" : "green"}
            style={{ opacity: (isBossNode || node.data.section === initialSection) ? 1 : 0 }}
          >
            {node.data.name}
          </text>
        </g>
      );
    });


    function choose(choices) {
      var index = Math.floor(Math.random() * choices.length);
      return choices[index];
    }
    const calculateBendPoints = (dendrogram, positionRadius, radius) => {
      return dendrogram
        .descendants()
        .filter(node => node.depth > 0)
        .map(node => {
          const parentNode = node.parent;
          const endRadius = positionRadius[node.data.value] || radius;

          const startX = Math.cos((parentNode.x - 90) * (Math.PI / 180));
          const startY = Math.sin((parentNode.x - 90) * (Math.PI / 180));
          const endX = endRadius * Math.cos((node.x - 90) * (Math.PI / 180));
          const endY = endRadius * Math.sin((node.x - 90) * (Math.PI / 180));

          const midRadius = (endRadius / 2) * (.5);
          const midX = midRadius * Math.cos(((parentNode.x + node.x) / 2 - 90) * (Math.PI / 180));
          const midY = midRadius * Math.sin(((parentNode.x + node.x) / 2 - 90) * (Math.PI / 180));

          return { startX, startY, midX, midY, endX, endY, parentNode, node };
        });
    };

    const bendPoints = calculateBendPoints(dendrogram, positionRadius, radius);

    const linksGenerator = d3.line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveBundle.beta(0.9)); // Adjust the curvature

    const edges = bendPoints.map((bp, i) => {
      const pathData = [
        { x: bp.startX, y: bp.startY },
        { x: bp.midX, y: bp.midY },
        { x: bp.endX, y: bp.endY }
      ];

      const isEdgeRevealed = revealedSections.has(bp.node.data.section) || revealedSections.has(bp.parentNode.data.section);

      return (
        <path
          key={i}
          fill="none"
          stroke="grey"
          d={linksGenerator(pathData)}
          style={{
            opacity: isEdgeRevealed ? 1 : 0
          }}
        />
      );
    });

    setAllNodes(nodes);  // Correctly set the nodes
    setAllEdges(edges); 
  }, [data, width, height, revealedSections]);

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
      .select("text")
      .transition()
      .style("fill", "grey")
      .style("font-size", "12px");

    // Reveal nodes of the current section
    const nodeSelection = d3.select(nodesRef.current).selectAll("g")
      .filter(function () {
        const nodeData = JSON.parse(this.getAttribute('data-node'));
        return nodeData.section === sectionName;
      });

    // nodeSelection.select("circle").transition().style("opacity", 1).style("fill", "#69b3a2").attr("r", 10);
    nodeSelection.select("text").transition().style("opacity", 1).style("fill", "green").style("font-size", "16px"); // Ensure labels are visible
  };



  useImperativeHandle(ref, () => ({
    revealNodes,
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
