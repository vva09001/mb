import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import { NewActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import { Error, Success } from 'helpers/notify';
import history from 'helpers/history';
import { connect } from 'react-redux';

const PropsType = {
  newsCreate: PropTypes.func
};

function NewsCreate({ newsCreate }) {
  const [formState, setFormState] = useState({
    values: {},
    touched: {}
  });

  const { t } = useTranslation();

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const onSuccess = () => {
    Success('Tạo thành công');
    history.goBack();
  };

  const onFail = () => {
    Error('Tạo thất bại');
  };

  const createdNews = event => {
    event.preventDefault();
    newsCreate(formState.values, onSuccess, onFail);
  };
  return (
    <React.Fragment>
      <Form className="p-3" style={{ background: '#fff' }} onSubmit={createdNews}>
        <h4>{t('create')}</h4>
        <FormGroup>
          <Label for="exampleName">{t('name')}</Label>
          <Input type="text" name="name" id="exampleName" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">{t('summary')}</Label>
          <Input type="textarea" name="slug" rows="5" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">{t('imgDescription')}</Label>
          <Input type="file" name="file" id="exampleFile" />
        </FormGroup>
        <FormGroup>
          <Label>{t('description')}</Label>
          <CKEditor editor={ClassicEditor} />
        </FormGroup>
        <FormGroup>
          <Label>{t('authName')}</Label>
          <Input type="text" name="author_name" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">{t('baseImages')}</Label>
          <Input type="file" name="file" id="exampleFile" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">{t('category')}</Label>
          <Input type="select" name="category_news_id" id="exampleSelect" onChange={handleChange}>
            <option value={0}>Tin tức</option>
            <option value={1}>Doanh nghiệp</option>
            <option value={2}>Hoạt động</option>
          </Input>
        </FormGroup>
        <Button color="primary" type="submit">
          Lưu
        </Button>
      </Form>
    </React.Fragment>
  );
}

NewsCreate.propTypes = PropsType;

const mamapDispatchToProps = {
  newsCreate: NewActions.AddNews
};

export default connect(
  null,
  mamapDispatchToProps
)(NewsCreate);
