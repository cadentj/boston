import { useMemo } from "react"
import * as d3 from "d3"
import { useState, useEffect, useRef } from "react"
import { transition, ease } from "d3";

const MARGIN = 150


export default function Dendrogram({ width, height, data }) {
    const svgRef = useRef(null);


    const hierarchy = useMemo(() => {
        return d3.hierarchy(data).sum(d => d.value)
    }, [data])

    const radius = Math.min(width, height) / 2 - MARGIN

    const dendrogram = useMemo(() => {
        const dendrogramGenerator = d3.cluster().size([360, radius])
        return dendrogramGenerator(hierarchy)
    }, [hierarchy, width, height])


    const allNodes = dendrogram.descendants().map(node => {
        if (node.depth === 0) return null; // skip rendering the boss node

        const turnLabelUpsideDown = node.x > 180;
        const rotation = turnLabelUpsideDown ? 180 : 0;
        return (
            <g
                key={node.id}
                transform={`translate(${node.y * Math.cos((node.x - 90) * (Math.PI / 180))}, ${node.y * Math.sin((node.x - 90) * (Math.PI / 180))})`}
            >
                <circle cx={0} cy={0} r={5} stroke="transparent" fill={"#69b3a2"} />
                {!node.children && (
                    <text
                        x={turnLabelUpsideDown ? -15 : 15}
                        y={0}
                        fontSize={12}
                        textAnchor={turnLabelUpsideDown ? "end" : "start"}
                        alignmentBaseline="middle"
                    >
                        {node.data.name}
                    </text>
                )}
            </g>
        )
    });


    const [additionalLinks, setAdditionalLinks] = useState([]);

    useEffect(() => {
        // Combine the current dendrogram links and additionalLinks to render
        allEdges.push(...additionalLinks);
    }, [additionalLinks]);

    // 2. Add a function that will be triggered when you click the button to update this state.
    const addLinks = () => {
        // Here's a sample way to add links. You'd modify this to match the structure and logic of your data.
        const newLinks = [{
            source: 'NodeA',
            target: 'NodeB'
        }, {
            source: 'NodeC',
            target: 'NodeD'
        }];
        setAdditionalLinks(newLinks);
    };

    const linksGenerator = d3
        .lineRadial()
        .radius((d) => d.y)
        .angle((d) => (d.x / 180) * Math.PI)
        .curve(d3.curveBundle.beta(0.3));


    let nameToNodeMap = {};
    dendrogram.descendants().map((node) => {
        nameToNodeMap[node.data.name] = node;
    });

    const allEdges = dendrogram
        .descendants() // find all nodes of the tree
        .filter((node) => node.data.type === "leaf" && node.data.links.length > 0) // keep only leaves that have links
        .map((sourceNode, i) => {
            return sourceNode.data.links.map((targetNodeName) => { // Loop through all the links we need to draw
                const traversedNodes = sourceNode.path(nameToNodeMap[targetNodeName]); // The path function provides a list of all the nodes we need to traverse from source to target!

                const traversedCoords = traversedNodes.map((node) => { // Find the coordinates of all nodes on the way
                    return { x: node.x, y: node.y };
                });

                return (
                    <path
                        key={i}
                        fill="none"
                        stroke="grey"
                        d={linksGenerator(traversedCoords)} // transform the list of coordinates to an SVG path
                    />
                );
            });
        });

    useEffect(() => {
        // Select the SVG element
        const svg = d3.select(svgRef.current);

        // Fade in the nodes
        svg.selectAll("circle")
            .transition()
            .duration(1000)
            .attr("opacity", 1)
            // .ease(easeCubicInOut);

        // Fade in the edges
        svg.selectAll("path")
            .transition()
            .duration(1000)
            .attr("opacity", 1)
            // .ease(easeCubicInOut);
    }, [allNodes, allEdges]);


    return (
        <div>
            <svg ref={svgRef} width={width} height={height}>
                <g
                    transform={
                        "translate(" +
                        (radius + MARGIN / 2) +
                        "," +
                        (radius + MARGIN / 2) +
                        ")"
                    }
                >
                    {allEdges}
                    {allNodes}
                </g>
            </svg>
        </div>
    )
}
