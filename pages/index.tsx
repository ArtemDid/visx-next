import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Example from '../Components/Example';

export default function root() {
  return (
    <ParentSize>
      {({ width, height }) =>
        <Example width={1000} height={1000} />}
    </ParentSize>
  );
}









