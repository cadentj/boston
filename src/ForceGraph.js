import React from "react";
import { ForceGraph2D } from 'react-force-graph'
import * as d3 from 'd3-force';
import { useCallback, useMemo, useState } from "react";


function genRandomTree(N = 300, reverse = false) {
    return {
        nodes: [...Array(N).keys()].map(i => ({ id: i })),
        links: [...Array(N).keys()]
            .filter(id => id)
            .map(id => ({
                [reverse ? 'target' : 'source']: id,
                [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1))
            }))
    };
}

export default function ForceGraph({ setSelected }) {
    const NODE_R = 12;

    const data = useMemo(() => {

        const gData = genRandomTree(80);

        // cross-link node objects
        gData.links.forEach(link => {
            const a = gData.nodes[link.source];
            const b = gData.nodes[link.target];
            !a.neighbors && (a.neighbors = []);
            !b.neighbors && (b.neighbors = []);
            a.neighbors.push(b);
            b.neighbors.push(a);

            !a.links && (a.links = []);
            !b.links && (b.links = []);
            a.links.push(link);
            b.links.push(link);
        });

        return gData;
    }, []);

    const [highlightNodes, setHighlightNodes] = useState(new Set());
    const [highlightLinks, setHighlightLinks] = useState(new Set());
    const [hoverNode, setHoverNode] = useState(null);
    const [clickedNode, setClickedNode] = useState(null);
    const [isClicked, setClicked] = useState(false)


    const handleNodeClick = node => {
        setSelected(node.id)
        setClicked(true)
        if (node) {
            if (clickedNode === node) {
                // Highlight the clicked node and its neighbors and links
                highlightNodes.clear();
                highlightLinks.clear();
                highlightNodes.add(node);
                node.neighbors.forEach(neighbor => highlightNodes.add(neighbor));
                node.links.forEach(link => highlightLinks.add(link));
                setClickedNode(node);
            }
        }

        updateHighlight();
    };



    const updateHighlight = () => {
        setHighlightNodes(highlightNodes);
        setHighlightLinks(highlightLinks);
    };

    const handleNodeHover = node => {
        if (!isClicked) {
            console.log(isClicked)
            highlightNodes.clear();
            highlightLinks.clear();
            if (node) {
                highlightNodes.add(node);
                node.neighbors.forEach(neighbor => highlightNodes.add(neighbor));
                node.links.forEach(link => highlightLinks.add(link));
            }

            setHoverNode(node || null);
            updateHighlight();
        }
    };

    const handleLinkHover = link => {
        highlightNodes.clear();
        highlightLinks.clear();

        if (link) {
            highlightLinks.add(link);
            highlightNodes.add(link.source);
            highlightNodes.add(link.target);
        }

        updateHighlight();
    };

    const paintRing = useCallback((node, ctx) => {
        // add ring just for highlighted nodes
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
        if (node === hoverNode || node === clickedNode) {
            ctx.fillStyle = 'red';
        } else {
            ctx.fillStyle = 'orange';
        }
        ctx.fill();
    }, [hoverNode, clickedNode]);


    // Used GPT to generate this force simulation on the links and charges
    const forceSimulation = useMemo(() => {
        // Create a new force simulation
        const simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(d => d.id))  // This force pushes linked nodes together
            .force("charge", d3.forceManyBody().strength(-200));  // This force repels nodes from each other

        // Assign nodes and links to the simulation
        simulation.nodes(data.nodes);
        simulation.force("link").links(data.links);

        return simulation;
    }, [data]);



    return <ForceGraph2D
        graphData={data}
        dagMode="radialin"
        nodeRelSize={NODE_R}
        dagLevelDistance={50}
        autoPauseRedraw={false}
        linkWidth={link => highlightLinks.has(link) ? 5 : 1}
        linkDirectionalParticles={4}
        linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 4 : 0}
        nodeCanvasObjectMode={node => highlightNodes.has(node) ? 'before' : undefined}
        nodeCanvasObject={paintRing}
        onNodeHover={handleNodeHover}
        // onLinkHover={handleLinkHover}
        onNodeClick={handleNodeClick}
        onBackgroundClick={() => {
            // Clear the highlight if clicking on the background
            highlightNodes.clear();
            highlightLinks.clear();
            setClickedNode(null);
            updateHighlight();
            setClicked(false);
        }}
        d3Force={(simulation) => {
            // Here we are replacing the d3 simulation with our custom simulation
            simulation.stop();  // Stop the existing simulation
            Object.assign(simulation, forceSimulation);  // Assign our custom simulation
        }}
    />
}


