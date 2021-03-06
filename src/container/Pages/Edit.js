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
  detail: Proptypes.array,
  listCategory: Proptypes.array,
  listNews: Proptypes.array,
  listPageActive: Proptypes.array,
  getPage: Proptypes.func,
  getCategory: Proptypes.func,
  getNewByCategoryID: Proptypes.func,
  getDetailById: Proptypes.func,
  deleteBlock: Proptypes.func,
  pageEdit: Proptypes.func
};

function BlockElement({
  detail,
  listCategory,
  listNew,
  listPageActive,
  getPage,
  getCategory,
  getNewByCategoryID,
  getDetailById,
  deleteBlock,
  pageEdit
}) {
  const [formState, setFormState] = useState({ values: {} });
  const [pageBlock, setPageBlock] = useState([]);
  const [isOpen, setIsOpen] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getDetailById(id);
    getCategory();
    getPage();
  }, [getDetailById, id, getCategory, getPage]);

  useEffect(() => {
    let menuID = 0;
    if (detail.menuMiddle !== undefined && detail.menuMiddle !== null) {
      menuID = detail.menuMiddle.id;
    }
    setFormState(formState => ({
      ...formState,
      values: { ...detail, menuMiddleId: menuID }
    }));
    setPageBlock(detail.pageBlocks);
  }, [detail]);

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

  const getNewsByCategoryID = value => {
    getNewByCategoryID(value);
  };

  const removeBlock = (id_block, index) => {
    if (id_block !== 0) {
      deleteBlock(id, id_block);
    }
    let data = filter(pageBlock, (item, itemIndex) => itemIndex !== index);
    setPageBlock(data);
  };

  const onSubmit = event => {
    event.preventDefault();
    let body = {
      ...formState.values,
      teams: formState.values.team,
      pageBlocks: pageBlock
    };
    pageEdit(body, '/pages/list');
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
                  {data.title === undefined ? 'Khối mới' : data.title}
                  <div style={{ float: 'right' }}>
                    <Button onClick={() => removeBlock(data.id, index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </ListGroupItem>
                <Collapse isOpen={isOpen === index}>
                  <ListGroup>
                    {data.name === 'Block Icon' && (
                      <ListGroupItem>
                        <Icon onRender={onRender} key={index} indexElement={index} data={data} />
                      </ListGroupItem>
                    )}
                    {data.name === 'Block Images' && (
                      <ListGroupItem>
                        <Images onRender={onRender} key={index} indexElement={index} data={data} />
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
                          data={data}
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
                          data={data}
                        />
                      </ListGroupItem>
                    )}
                    {data.name === 'Repeat' && (
                      <ListGroupItem>
                        <Repeat onRender={onRender} key={index} indexElement={index} data={data} />
                      </ListGroupItem>
                    )}
                    {data.name === 'Product' && (
                      <ListGroupItem>
                        <Product
                          onRender={onRender}
                          key={index}
                          indexElement={index}
                          listPage={listPageActive}
                          data={data}
                        />
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
    detail: state.PageReducer.detail,
    listCategory: state.CategoryReducer.listOption,
    listNew: state.NewReducer.listNewByCategory,
    listPageActive: state.PageReducer.listPageActive
  };
};

const mapDispatchToProps = {
  getDetailById: PageActions.getPageByID,
  pageEdit: PageActions.EditPages,
  deleteBlock: PageActions.detelePageBlockAction,
  getCategory: CategoryActions.getCategoryAction,
  getNewByCategoryID: NewActions.getNewByCategory,
  getPage: PageActions.GetPages
};

BlockElement.propTypes = Proptype;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockElement);
