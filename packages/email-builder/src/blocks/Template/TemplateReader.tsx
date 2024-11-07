import React from 'react';

import Reader from '../../Reader/core';

import { TemplateProps } from './TemplatePropsSchema';

export default function TemplateReader({ props }: TemplateProps) {
  if (!props?.document || !props.id) {
    return <div>No template provided</div>;
  }

  return (
    <div id={props.id}>
      <Reader document={props.document} rootBlockId="root" isWidget={true} />
    </div>
  );
}
