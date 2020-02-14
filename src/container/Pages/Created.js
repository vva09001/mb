import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Collapse, ListGroup, ListGroupItem, Button } from 'reactstrap';
import Form from '../../components/page/Form';
import Icon from 'components/element/Icon';
import { map, filter } from 'lodash';
import { useParams } from 'react-router-dom';
import ListGroups from 'components/listBlock';
import { PageActions } from '../../store/actions';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

const Proptype = {
  pageCreate: Proptypes.func
};

function BlockElement({ pageCreate }) {
  const [formState, setFormState] = useState({ values: {} });
  const [pageBlock, setPageBlock] = useState([]);
  const [isOpen, setIsOpen] = useState(null);

  const { id } = useParams();

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value
      }
    }));
  };

  const getImage = (key, imageSeletedata) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [key]: imageSeletedata.url
      }
    }));
  };

  const onRender = (element, indexElement, title, conent) => {
    let convertElement = ReactDOMServer.renderToString(element);
    let data = map(pageBlock, (value, index) => {
      if (indexElement !== index) {
        return value;
      } else {
        return {
          ...value,
          title,
          contentHtml: convertElement,
          content: JSON.stringify(conent)
        };
      }
    });
    setPageBlock(data);
  };

  const removeBlock = index => {
    let data = filter(pageBlock, (item, itemIndex) => itemIndex !== index);
    setPageBlock(data);
  };
  const onSubmit = event => {
    event.preventDefault();
    let body = {
      ...formState.values,
      parent_id: id,
      is_active: 0,
      pageBlocks: pageBlock
    };
    pageCreate(body);
  };

  return (
    <Row style={{ background: '#fff', padding: '15px 0' }}>
      <Col sm={3}>
        <ListGroups
          setListBlock={name => {
            setPageBlock([...pageBlock, { id: 0, name: name, id_block: 1, id_page: id, position: pageBlock.length }]);
            setIsOpen(null);
          }}
        />
      </Col>
      <Col sm={9}>
        <Form formState={formState} handleChange={handleChange} getImage={getImage} onSubmit={onSubmit}>
          {map(pageBlock, (data, index) => {
            return (
              <div key={index}>
                <ListGroupItem className="block__title" onClick={() => setIsOpen(isOpen === index ? null : index)}>
                  Khối mới
                  <div style={{ float: 'right' }}>
                    <Button onClick={() => removeBlock(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </ListGroupItem>
                <Collapse isOpen={isOpen === index}>
                  <ListGroup>
                    {data.name === 'Icon' && (
                      <ListGroupItem>
                        <Icon onRender={onRender} key={index} indexElement={index} />
                      </ListGroupItem>
                    )}
                  </ListGroup>
                </Collapse>
              </div>
            );
          })}
        </Form>
      </Col>
    </Row>
  );
}

const mapDispatchToProps = {
  pageCreate: PageActions.AddPages
};

BlockElement.propTypes = Proptype;

export default connect(
  null,
  mapDispatchToProps
)(BlockElement);
