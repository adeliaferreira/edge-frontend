import React, { useState } from 'react';
import {Flex, FlexItem, Pagination, Tabs, Tab, TabTitleText, SearchInput} from '@patternfly/react-core';
import { sortable , Table, TableHeader, TableBody } from '@patternfly/react-table';


const columns = [{ title: 'Name', transforms: [sortable] }, { title: 'Version', transforms: [sortable] }];
const rows = [
  [{name: 'avim', version: '1.2.3'},{name: 'vwim', version: '1.2.3'},{name: 'vbim', version: '1.2.3'},{name: 'mhvimm', version: '1.2.3'}], 
  [{name: 'zvim', version: '1.2.3'},{name: 'cvim', version: '1.2.3'},{name: 'vvim', version: '1.2.3'},{name: 'evim', version: '1.2.3'}],  
  [{name: 'svim', version: '1.2.3'},{name: 'hvim', version: '1.2.3'},{name: 'evim', version: '1.2.3'},{name: 'tvim', version: '1.2.3'}], 
]
const ImageSetPackages = () => {
    const [activeTabKey, setActiveTabKey] = useState(0)
    const [searchValue, setsearchValue] = useState()
    const [sortBy, setSortBy] = useState({});
    const [rowState, setRowState] = useState(rows)
    const handleSearch = (value) =>{
      let filterList = rows[activeTabKey].filter(row => row.name.includes(value))
      console.log(filterList)
      rowState[activeTabKey] = filterList
      setRowState(rowState)
      setActiveTabKey(activeTabKey)
      console.log(rowState)
    }
    const handleTabClick = (event, tabIndex) => setActiveTabKey(tabIndex)
    
    return <div style={{height:'500px'}}>
          <Tabs activeKey={activeTabKey} onSelect={handleTabClick}>
            <Tab eventKey={0} title={<TabTitleText>Added</TabTitleText>}/>
            <Tab eventKey={1} title={<TabTitleText>Removed</TabTitleText>}/>
            <Tab eventKey={2} title={<TabTitleText>Updated</TabTitleText>}/>
          </Tabs>
          <Flex>
            <FlexItem>
            <SearchInput value={searchValue} onChange={(value) => handleSearch(value)} placeholder="Search by Name" />
            </FlexItem>
            <FlexItem/>
            <FlexItem align={{ default: 'alignRight' }}>
            <Pagination
              itemCount={4}
              perPage={4}
              page={1}
              onSetPage={()=>console.log(' change')}
              widgetId="pagination-options-menu-top"
              onPerPageSelect={() => console.log(' perpage select')}
              isCompact
            />
            </FlexItem>
          </Flex>
          <Table
            aria-label="Packages table"
            cells={columns}
            rows={rowState[activeTabKey].map((row) => ({
              cells: [
                {
                  title: row.name,
                },
                {
                  title: row.version,
                },
              ],
            }))}
            sortBy={sortBy}
            onSort={(_e, index, direction) =>
            setSortBy(() => ({
              index,
              direction,
            }))
            }
          >
            <TableHeader />
            <TableBody />
          </Table>
          <div style={{height:'25px'}}/>
          <Pagination
            itemCount={4}
            perPage={4}
            page={1}
            onSetPage={()=>console.log(' change')}
            widgetId="pagination-options-menu-top"
            onPerPageSelect={() => console.log(' perpage select')}
          />
        </div>
}

export default ImageSetPackages;
