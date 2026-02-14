
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const KnowledgeGraph = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;

    const nodes = [
      { id: 'Root', group: 1, size: 20 },
      { id: 'Network', group: 2, size: 15 },
      { id: 'Security', group: 2, size: 15 },
      { id: 'DevOps', group: 2, size: 15 },
      { id: 'Infrastructure', group: 2, size: 15 },
      { id: 'Docker', group: 3, size: 10 },
      { id: 'K8s', group: 3, size: 10 },
      { id: 'AWS', group: 3, size: 10 },
      { id: 'Auth', group: 3, size: 10 },
      { id: 'Firewall', group: 3, size: 10 },
      { id: 'Switching', group: 3, size: 10 },
    ];

    const links = [
      { source: 'Root', target: 'Network' },
      { source: 'Root', target: 'Security' },
      { source: 'Root', target: 'DevOps' },
      { source: 'Root', target: 'Infrastructure' },
      { source: 'DevOps', target: 'Docker' },
      { source: 'DevOps', target: 'K8s' },
      { source: 'Infrastructure', target: 'AWS' },
      { source: 'Security', target: 'Auth' },
      { source: 'Security', target: 'Firewall' },
      { source: 'Network', target: 'Switching' },
    ];

    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`);

    svg.selectAll("*").remove(); 

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 2);

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    node.append('circle')
      .attr('r', (d) => d.size)
      .attr('fill', (d) => {
        if (d.group === 1) return '#6366f1';
        if (d.group === 2) return '#818cf8';
        return '#c7d2fe';
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    node.append('text')
      .text((d) => d.id)
      .attr('x', 12)
      .attr('y', 4)
      .style('font-size', '12px')
      .style('font-weight', '500')
      .style('fill', '#475569');

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden h-full min-h-[600px] flex flex-col relative shadow-sm">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-800 text-lg">Semantic Knowledge Map</h3>
          <p className="text-sm text-slate-500">Visual connections between your documents and entities.</p>
        </div>
      </div>
      <div className="flex-1 cursor-grab active:cursor-grabbing">
        <svg ref={svgRef} className="w-full h-full" />
      </div>
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-3 h-3 rounded-full bg-indigo-600"></span> Main Concept
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-3 h-3 rounded-full bg-indigo-400"></span> Category
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-3 h-3 rounded-full bg-indigo-200"></span> Document
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;
