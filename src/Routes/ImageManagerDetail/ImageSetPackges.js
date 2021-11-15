import React, { useState } from 'react';
import { Tabs, Tab, TabTitleText} from '@patternfly/react-core';
import { TableComposable, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
const columns = ['Name', 'Version'];
  const rows = [
    ['Vim', '1.2'],
  ];

const ImageSetPackages = () => {
    return <div>
          <Tabs activeKey={0}  isBox={false}>
            <Tab eventKey={0} title={<TabTitleText>Added</TabTitleText>}/>
            <Tab eventKey={1} title={<TabTitleText>Removed</TabTitleText>}/>
            <Tab eventKey={2} title={<TabTitleText>Updated</TabTitleText>}/>
          </Tabs>
          <TableComposable variant='default'>
                <Thead>
                <Tr>
                    {columns.map((column, columnIndex) => (
                    <Th key={columnIndex}>{column}</Th>
                    ))}
                </Tr>
                </Thead>
                <Tbody>
                {rows.map((row, rowIndex) => (
                    <Tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <Td key={`${rowIndex}_${cellIndex}`} dataLabel={columns[cellIndex]}>
                        {cell}
                        </Td>
                    ))}
                    </Tr>
                ))}
                </Tbody>
            </TableComposable>
    </div>
}

export default ImageSetPackages;
