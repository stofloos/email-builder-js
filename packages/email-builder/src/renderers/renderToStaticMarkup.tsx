import React from 'react';
import { renderToStaticMarkup as baseRenderToStaticMarkup } from 'react-dom/server';

import Reader, { TReaderDocument } from '../Reader/core';

type TOptions = {
  rootBlockId: string;
  childrenDocuments?: Record<string, TReaderDocument>;
};
export default function renderToStaticMarkup(document: TReaderDocument, { rootBlockId, childrenDocuments }: TOptions) {
  return (
    '<!DOCTYPE html>' +
    baseRenderToStaticMarkup(
      <html>
        <body>
          <Reader document={document} rootBlockId={rootBlockId} childrenDocuments={childrenDocuments} />
        </body>
      </html>
    )
  );
}
