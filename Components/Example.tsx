import React, { useState } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import useForceUpdate from './useForceUpdate';
import LinkControls from './LinkControls';
import getLinkComponent from './getLinkComponent';
import DATA from '../public/data';

interface TreeNode {
  name: string;
  color: string;
  content: string;
  isExpanded?: boolean;
  children?: TreeNode[];
}

const data: TreeNode = DATA;

const defaultMargin = { top: 70, left: 30, right: 30, bottom: 70 };

export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default function Example({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
}: LinkTypesProps) {
  const [layout, setLayout] = useState<string>('cartesian');
  const [orientation, setOrientation] = useState<string>('vertical');
  const [linkType, setLinkType] = useState<string>('step');
  const [stepPercent, setStepPercent] = useState<number>(0.8);
  const forceUpdate = useForceUpdate();

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;

  if (layout === 'polar') {
    origin = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    sizeWidth = 2 * Math.PI;
    sizeHeight = Math.min(innerWidth, innerHeight) / 2;
  } else {
    origin = { x: 0, y: 0 };
    if (orientation === 'vertical') {
      sizeWidth = innerWidth;
      sizeHeight = innerHeight;
    } else {
      sizeWidth = innerHeight;
      sizeHeight = innerWidth;
    }
  }

  const LinkComponent = getLinkComponent({ layout, linkType, orientation });

  return totalWidth < 10 ? null : (
    <div>
      <LinkControls
        layout={layout}
        orientation={orientation}
        linkType={linkType}
        stepPercent={stepPercent}
        setLayout={setLayout}
        setOrientation={setOrientation}
        setLinkType={setLinkType}
        setStepPercent={setStepPercent}
      />
      <svg width={totalWidth} height={totalHeight}>
        <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
        <rect width={totalWidth} height={totalHeight} rx={14} fill="#272b4d" />
        <Group top={margin.top} left={margin.left}>
          <Tree
            root={hierarchy(data, d => (d.isExpanded ? null : d.children))}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
          >
            {tree => (
              <Group top={origin.y} left={origin.x}>
                {tree.links().map((link, i) => (
                  <LinkComponent
                    key={i}
                    data={link}
                    percent={stepPercent}
                    stroke="rgb(254,110,158,0.6)"
                    strokeWidth="1"
                    fill="none"
                  />
                ))}

                {tree.descendants().map((node, key) => {
                  const width = 100;
                  const height = 100;

                  let top: number;
                  let left: number;
                  if (layout === 'polar') {
                    const [radialX, radialY] = pointRadial(node.x, node.y);
                    top = radialY;
                    left = radialX;
                  } else if (orientation === 'vertical') {
                    top = node.y;
                    left = node.x;
                  } else {
                    top = node.x;
                    left = node.y;
                  }

                  return (
                    <Group top={top} left={left} key={key}>
                      <rect
                        height={height}
                        width={width}
                        y={-height / 2}
                        x={-width / 2}
                        fill='blue'
                        stroke={node.data.children ? '#fc8003' : '#26deb0'}
                        strokeWidth={1}
                        strokeDasharray={'2,2'}
                        strokeOpacity={0.6}
                        rx={10}
                        onClick={() => {
                          node.data.isExpanded = !node.data.isExpanded;
                          forceUpdate();
                        }}
                      />
                      <rect
                        height={height - 40}
                        width={width - 5}
                        y={(-height + 30) / 2}
                        x={(-width + 5) / 2}
                        fill={node.data.color}
                        stroke={node.data.children ? '#fc8003' : '#26deb0'}
                        strokeWidth={1}
                        strokeDasharray={'2,2'}
                        strokeOpacity={0.6}
                        rx={0}
                        onClick={() => {
                          node.data.isExpanded = !node.data.isExpanded;
                          forceUpdate();
                        }}
                      />

                      <text
                        dy=".33em"
                        fontSize={20}
                        fontFamily="Arial"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none'}}
                        fill={'white'}
                      >
                        {node.data.content}
                      </text>
                      <text
                        dy="3em"
                        fontSize={14}
                        fontFamily="Arial"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none'}}
                        fill={'white'}
                      >
                        {node.data.name}
                      </text>

                    </Group>
                  );
                })}
              </Group>
            )}
          </Tree>
        </Group>
      </svg>
    </div>
  );
}