import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Error } from 'helpers/notify';
import { map, filter } from 'lodash';
import CodeMirror from 'react-codemirror';
import { BlockActions, TagActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

const PropsType = {
  listTags: PropTypes.array,
  listTypes: PropTypes.array,
  createBlock: PropTypes.func,
  getTags: PropTypes.func,
  getTypes: PropTypes.func
};

const options = {
  lineNumbers: true
};

function BlockCreate({ listTags, listTypes, getTags, getTypes, createBlock }) {
  const [formState, setFormState] = useState({
    values: {
      tagId: '0'
      // html: '',
    },
    touched: {}
  });
  const [code, setCode] = useState('');
  const [formAddMore, setFormAddMore] = useState([{ key: '', title: '', type_id: 1, id: 0, position: 0 }]);
  const [activeTab, setActiveTab] = useState('1');
  const [status, setStatus] = useState({
    tagId: false,
    html: false
  });
  const { register, errors, triggerValidation, handleSubmit } = useForm();

  useEffect(() => {
    getTags();
    getTypes();
  }, [getTags, getTypes]);

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
      type_id: 1,
      id: 0,
      position: 0
    };
    setFormAddMore([...formAddMore, blockValues]);
  };

  const removeItem = indexItems => {
    const newValues = filter(formAddMore, (items, index) => index !== indexItems);
    setFormAddMore(newValues);
  };

  const handleError = async () => {
    var title = await triggerValidation('title');
    var key = await triggerValidation('key');
    var name = await triggerValidation('name');
    var active = await triggerValidation('active');
    if (title === false || key === false || name === false || active === false) {
      Error(t('errors.create'));
    }
    if (formState.values.tagId === '0')
      setStatus(status => ({
        ...status,
        tagId: true
      }));
    else {
      setStatus(status => ({
        ...status,
        tagId: false
      }));
    }
    if (code === '')
      setStatus(status => ({
        ...status,
        html: true
      }));
    else {
      setStatus(status => ({
        ...status,
        html: false
      }));
    }
  };
  const createdNews = () => {
    if (status.tagId === false && status.html === false)
      createBlock({ ...formState.values, html: code, blockValues: formAddMore });
    else Error(t('errors.create'));
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
          <Form className="p-3" style={{ background: '#fff' }} onSubmit={handleSubmit(createdNews)}>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <h4>{t('general')}</h4>
                <FormGroup>
                  <Label for="exampleName">{t('name')}</Label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    ref={register({
                      required: true
                    })}
                    className={errors.name === undefined ? 'inputStyle' : 'inputStyleError'}
                  />
                  {errors.name && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">{t('tags')}</Label>
                  <Input type="select" name="tagId" onChange={handleChange}>
                    <option value={0}>Chọn...</option>
                    {map(listTags, value => (
                      <option value={value.id} key={value.id}>
                        {value.name}
                      </option>
                    ))}
                  </Input>
                  {console.log(typeof(formState.values.tagId))}
                  {formState.values.tagId === '0' && status.tagId && (
                    <span style={{ color: 'red' }}>{t('errors.required')}</span>
                  )}
                </FormGroup>
                <div className="check__box">
                  <Label>{t('status')}</Label>
                  <div>
                    <input
                      type="checkbox"
                      name="active"
                      onChange={handleChange}
                      ref={register({
                        validate: value => value === true
                      })}
                      className={errors.active === undefined ? 'inputStyle' : 'inputStyleError'}
                    />
                    <span>{t('block_page.activeBock')}</span>
                  </div>
                </div>
                {errors.active && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
                <FormGroup>
                  <Label>{t('html')}</Label>
                  <CodeMirror options={options} name="html" onChange={newCode => setCode(newCode)} />
                  {code === '' && status.html && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
                </FormGroup>
              </TabPane>
              <TabPane tabId="2">
                <h4>{t('values')}</h4>
                {map(formAddMore, (items, index) => {
                  return (
                    <div key={index} style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                      <FormGroup className="mr-4">
                        <Label for="exampleName">{t('key')}</Label>
                        <input
                          type="text"
                          name="key"
                          onChange={event => handleChangeAddMore(event, index)}
                          ref={register({
                            required: true
                          })}
                          className={errors.key === undefined ? 'inputStyle' : 'inputStyleError'}
                        />
                        {errors.key && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
                      </FormGroup>
                      <FormGroup className="mr-4">
                        <Label for="exampleName">{t('title')}</Label>
                        <input
                          type="text"
                          name="title"
                          onChange={event => handleChangeAddMore(event, index)}
                          ref={register({
                            required: true
                          })}
                          className={errors.title === undefined ? 'inputStyle' : 'inputStyleError'}
                        />
                        {errors.title && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
                      </FormGroup>
                      <FormGroup className="mr-4">
                        <Label for="exampleSelect">{t('type')}</Label>
                        <Input type="select" name="type_id" onChange={event => handleChangeAddMore(event, index)}>
                          {map(listTypes, value => (
                            <option key={value.id} value={value.id} name={value.names}>
                              {value.names}
                            </option>
                          ))}
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
            <Button color="primary" type="submit" onClick={handleError}>
              {t('save')}
            </Button>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
}

BlockCreate.propTypes = PropsType;

const mapDistpatchToProps = state => {
  return {
    listTags: state.TagReducer.listTags,
    listTypes: state.BlockReducer.listTypes
  };
};

const mapDispatchToProps = {
  createBlock: BlockActions.createBlockAction,
  getTags: TagActions.getTagAction,
  getTypes: BlockActions.getTypeAction
};

export default connect(
  mapDistpatchToProps,
  mapDispatchToProps
)(BlockCreate);
