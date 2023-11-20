import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Den = ({ data }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const width = 800;
      const radius = width / 2;
      
      const tree = d3.tree()
          .size([2 * Math.PI, radius])
          .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

      const root = tree(d3.hierarchy(data));

      const svg = d3.select(d3Container.current)
          .attr('viewBox', [-width / 2, -width / 2, width, width]);

      const g = svg.append('g');

      g.selectAll('.link')
          .data(root.links())
          .enter()
          .append('path')
            .attr('class', 'link')
            .attr('d', d3.linkRadial()
                .angle(d => d.x)
                .radius(d => d.y));

      const node = g.selectAll('.node')
          .data(root.descendants())
          .enter()
          .append('g')
            .attr('class', d => `node${d.children ? ' node--internal' : ' node--leaf'}`)
            .attr('transform', d => `
              rotate(${d.x * 180 / Math.PI - 90})
              translate(${d.y},0)
            `);

      node.append('circle')
          .attr('r', 2.5);

      node.append('text')
          .attr('dy', '0.31em')
          .attr('x', d => d.x < Math.PI === !d.children ? 6 : -6)
          .attr('text-anchor', d => d.x < Math.PI === !d.children ? 'start' : 'end')
          .attr('transform', d => d.x >= Math.PI ? 'rotate(180)' : null)
          .text(d => d.data.name)
          .clone(true).lower()
            .attr('stroke', 'white');
    }
  }, [data, d3Container.current]);

  return (
    <svg ref={d3Container} style={{width: '100%', height: 'auto'}} />
  );
};

export default Den;
