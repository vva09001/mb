import React, { useState } from 'react';
import data from './data';
import { map } from 'lodash';
import { ListGroup, ListGroupItem, Collapse } from 'reactstrap';

function ListGroups({ setListBlock }) {
  const [opened, setOpened] = useState(null);

  return (
    <React.Fragment>
      {map(data, (value, index) => {
        return (
          <div key={index}>
            <ListGroupItem onClick={() => setOpened(opened === index ? null : index)}>{value.name}</ListGroupItem>
            <Collapse isOpen={opened === index}>
              {map(value.listElemnt, (item, index) => {
                return (
                  <ListGroup key={index}>
                    <ListGroupItem onClick={() => setListBlock(item.component)}>{item.name}</ListGroupItem>
                  </ListGroup>
                );
              })}
            </Collapse>
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default ListGroups;
