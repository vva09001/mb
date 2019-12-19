import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { map, filter } from 'lodash';
import CodeMirror from 'react-codemirror';
import { BlockActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const PropsType = {
  editBlock: PropTypes.func
};

const options = {
  lineNumbers: true
};

function BlockEdit({ editBlock }) {
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });
  const [code, setCode] = useState('');
  const [formAddMore, setFormAddMore] = useState([{ key: '', title: '', type_id: 0 }]);
  const [activeTab, setActiveTab] = useState('1');

  const { t } = useTranslation();

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleChangeAddMore = (event, index) => {
    let newFormAddMore = map(formAddMore, (values, id) => {
      if (index !== id) {
        return values;
      } else {
        return {
          ...values,
          [event.target.name]:
            event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value
        };
      }
    });
    setFormAddMore(newFormAddMore);
  };

  const addMore = () => {
    const blockValues = {
      key: '',
      title: '',
      type_id: 0
    };
    setFormAddMore([...formAddMore, blockValues]);
  };

  const removeItem = indexItems => {
    const newValues = filter(formAddMore, (items, index) => index !== indexItems);
    setFormAddMore(newValues);
  };

  const createdNews = event => {
    event.preventDefault();
    editBlock({ ...formState.values, html: code, blockValues: formAddMore });
  };

  return (
    <React.Fragment>
      <Row style={{ background: '#fff', padding: '15px 0' }}>
        <Col>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  toggle('1');
                }}
              >
                {t('general')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  toggle('2');
                }}
              >
                {t('values')}
              </NavLink>
            </NavItem>
          </Nav>
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={createdNews}>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <h4>{t('general')}</h4>
                <FormGroup>
                  <Label for="exampleName">{t('name')}</Label>
                  <Input type="text" name="name" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">{t('tags')}</Label>
                  <Input type="select" name="category_news_id" onChange={handleChange}>
                    <option>Chọn...</option>
                    <option value={1}>Menu</option>
                    <option value={2}>Icon</option>
                    <option value={3}>Silder</option>
                  </Input>
                </FormGroup>
                <div className="check__box">
                  <Label>{t('status')}</Label>
                  <div>
                    <Input type="checkbox" name="status" onChange={handleChange} />
                    <span>{t('block_page.activeBock')}</span>
                  </div>
                </div>
                <FormGroup>
                  <Label>{t('html')}</Label>
                  <CodeMirror options={options} name="html" onChange={newCode => setCode(newCode)} />
                </FormGroup>
              </TabPane>
              <TabPane tabId="2">
                <h4>{t('values')}</h4>
                {map(formAddMore, (items, index) => {
                  return (
                    <div key={index} style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                      <FormGroup className="mr-4">
                        <Label for="exampleName">{t('key')}</Label>
                        <Input type="text" name="key" onChange={event => handleChangeAddMore(event, index)} />
                      </FormGroup>
                      <FormGroup className="mr-4">
                        <Label for="exampleName">{t('title')}</Label>
                        <Input type="text" name="title" onChange={event => handleChangeAddMore(event, index)} />
                      </FormGroup>
                      <FormGroup className="mr-4">
                        <Label for="exampleSelect">{t('type')}</Label>
                        <Input type="select" name="type_id" onChange={event => handleChangeAddMore(event, index)}>
                          <option value={0}>Input</option>
                          <option value={1}>Textarea</option>
                          <option value={2}>Editor</option>
                          <option value={3}>Single Image</option>
                          <option value={4}>Multiple Images</option>
                          <option value={5}>Button</option>
                          <option value={6}>Group</option>
                          <option value={7}>Repeat</option>
                          <option value={8}>Contact form</option>
                          <option value={9}>Custom multi images</option>
                          <option value={10}>Products</option>
                        </Input>
                      </FormGroup>
                      <div className="mt-3">
                        <Button onClick={() => removeItem(index)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                <Button color="primary" className="mb-2" onClick={addMore}>
                  {t('addBlock')}
                </Button>
              </TabPane>
            </TabContent>
            <Button color="primary" type="submit">
              {t('save')}
            </Button>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
}

BlockEdit.propTypes = PropsType;

const mamapDispatchToProps = {
  editBlock: BlockActions.editBlockAction
};

export default connect(
  null,
  mamapDispatchToProps
)(BlockEdit);
