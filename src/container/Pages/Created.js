import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Collapse, ListGroup, ListGroupItem, Button } from 'reactstrap';
import Form from '../../components/page/Form';
import { Icon, Images, News, Post, Repeat, Product } from 'components/element';
import { map, filter } from 'lodash';
import { useParams } from 'react-router-dom';
import ListGroups from 'components/listBlock';
import { PageActions, CategoryActions, NewActions } from '../../store/actions';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

const Proptype = {
  listCategory: Proptypes.array,
  listNews: Proptypes.array,
  listPageActive: Proptypes.array,
  getPage: Proptypes.func,
  getCategory: Proptypes.func,
  getNewByCategoryID: Proptypes.func,
  pageCreate: Proptypes.func
};

function BlockElement({ listPageActive, listCategory, listNew, getPage, getCategory, getNewByCategoryID, pageCreate }) {
  const [formState, setFormState] = useState({ values: {} });
  const [pageBlock, setPageBlock] = useState([]);
  const [isOpen, setIsOpen] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getCategory();
    getPage();
  }, [getCategory, getPage]);

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

  const getNewsByCategoryID = value => {
    getNewByCategoryID(value);
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
                    {data.name === 'Block Icon' && (
                      <ListGroupItem>
                        <Icon onRender={onRender} key={index} indexElement={index} />
                      </ListGroupItem>
                    )}
                    {data.name === 'Block Images' && (
                      <ListGroupItem>
                        <Images onRender={onRender} key={index} indexElement={index} />
                      </ListGroupItem>
                    )}
                    {data.name === 'Block News' && (
                      <ListGroupItem>
                        <News
                          onRender={onRender}
                          key={index}
                          indexElement={index}
                          listCategory={listCategory}
                          listNew={listNew}
                          getNewsByCategoryID={getNewsByCategoryID}
                        />
                      </ListGroupItem>
                    )}
                    {data.name === 'Single Post' && (
                      <ListGroupItem>
                        <Post
                          onRender={onRender}
                          key={index}
                          indexElement={index}
                          listCategory={listCategory}
                          listNew={listNew}
                          getNewsByCategoryID={getNewsByCategoryID}
                        />
                      </ListGroupItem>
                    )}
                    {data.name === 'Repeat' && (
                      <ListGroupItem>
                        <Repeat onRender={onRender} key={index} indexElement={index} />
                      </ListGroupItem>
                    )}
                    {data.name === 'Product' && (
                      <ListGroupItem>
                        <Product onRender={onRender} key={index} indexElement={index} listPage={listPageActive} />
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

const mapStateToProps = state => {
  return {
    listCategory: state.CategoryReducer.listOption,
    listNew: state.NewReducer.listNewByCategory,
    listPageActive: state.PageReducer.listPageActive
  };
};

const mapDispatchToProps = {
  pageCreate: PageActions.AddPages,
  getCategory: CategoryActions.getCategoryAction,
  getNewByCategoryID: NewActions.getNewByCategory,
  getPage: PageActions.GetPages
};

BlockElement.propTypes = Proptype;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockElement);
