import React from "react";
import { ForceGraph2D } from 'react-force-graph'
import * as d3 from 'd3-force';
import { useCallback, useMemo, useState } from "react";
import SpriteText from "three-spritetext";


const BACKGROUNDCOLOR = "#000000"; 
const LINKCOLOR = "#D3D3D3";       
const NODECOLOR = "#e6194B";      
const HOVEREDTARGETNODECOLOR = "#4363d8";  
const HOVEREDSOURCENODECOLOR = "#3cb44b"; 
const MATERIALCOLOR = '#000000'

function genRandomTree(N = 300, reverse = false) {
    return {
        nodes: [...Array(N).keys()].map(i => ({ id: i })),
        links: [...Array(N).keys()]
            .filter(id => id)
            .map(id => ({
                'demo': 'test',
                [reverse ? 'target' : 'source']: id,
                [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1))
            }))
    };
}

export default function ForceGraph({ selected, setSelected, setSLink }) {
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
    const [selectedLinks, setSelectedLinks] = useState(new Set())



    const handleNodeClick = node => {
        if (!isClicked) {
            setSelected(node)
            setClicked(true)
        }
        if (node && clickedNode === node) {
            // Highlight the clicked node and its neighbors and links
            highlightNodes.clear();
            highlightLinks.clear();
            highlightNodes.add(node);
            node.neighbors.forEach(neighbor => highlightNodes.add(neighbor));
            node.links.forEach(link => highlightLinks.add(link));
            setClickedNode(node);
        }

        updateHighlight();
    };

    const handleNodeHover = node => {
        if (!isClicked) {
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
        if (link === null) {
            selectedLinks.clear()
            updateHighlight()
            return
        }
        if (isClicked) {
            if (link.source.id === selected.id) {
                selectedLinks.clear();
                setSLink(link.target.id)

                if (link) {
                    selectedLinks.add(link);
                }

                updateHighlight();
            } else if (link.target.id === selected.id) {
                selectedLinks.clear();
                setSLink(link.source.id)

                if (link) {
                    selectedLinks.add(link);
                }

                updateHighlight();
            }

        }
    };

    const updateHighlight = () => {
        setHighlightNodes(highlightNodes);
        setHighlightLinks(highlightLinks);
    };

    const paintRing = useCallback((node, ctx) => {
        // add ring just for highlighted nodes
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
        if (node === hoverNode || node === clickedNode) {
            ctx.fillStyle = HOVEREDTARGETNODECOLOR;
        } else {
            ctx.fillStyle = HOVEREDSOURCENODECOLOR;
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

        // Graph style properties
        nodeRelSize={NODE_R}
        backgroundColor={BACKGROUNDCOLOR}
        nodeColor={node => 'red'}
        linkColor={link => LINKCOLOR}
        linkDirectionalParticleColor={MATERIALCOLOR}
        linkWidth={link => highlightLinks.has(link) ? 5 : 1}
        linkDirectionalParticles={4}
        linkDirectionalParticleWidth={link => selectedLinks.has(link) ? 8 : 0}

        // Graph force and rendering properties
        dagMode="radialin"
        dagLevelDistance={50}
        autoPauseRedraw={false}
        nodeCanvasObjectMode={node => highlightNodes.has(node) ? 'before' : undefined}
        nodeCanvasObject={paintRing}
        d3Force={(simulation) => {
            // Here we are replacing the d3 simulation with our custom simulation
            simulation.stop();  // Stop the existing simulation
            Object.assign(simulation, forceSimulation);  // Assign our custom simulation
        }}

        // Interaction properties
        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover}
        onNodeClick={handleNodeClick}
        onBackgroundClick={() => {
            // Clear the highlight if clicking on the background
            highlightNodes.clear();
            highlightLinks.clear();
            setClickedNode(null);
            updateHighlight();
            setClicked(false);
            setSelected(null)
        }}
    />
}


