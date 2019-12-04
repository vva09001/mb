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
  detail: PropTypes.object,
  editNew: PropTypes.func
};

function Edit({ detail, editNew }) {
  const [formState, setFormState] = useState({
    values: detail,
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
    Success('Sửa thành công');
    history.goBack();
  };

  const onFail = () => {
    Error('Sửa thất bại');
  };

  const editNews = event => {
    event.preventDefault();
    editNew(formState.values, onSuccess, onFail);
  };
  return (
    <React.Fragment>
      <Form className="p-3" style={{ background: '#fff' }} onSubmit={editNews}>
        <h4>Sửa</h4>
        <FormGroup>
          <Label for="exampleName">{t('name')}</Label>
          <Input type="text" name="name" value={formState.values.name} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">{t('summary')}</Label>
          <Input type="textarea" name="slug" rows="5" value={formState.values.slug} onChange={handleChange} />
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
          <Input type="text" name="author_name" value={formState.values.author_name} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">{t('baseImages')}</Label>
          <Input type="file" name="file" id="exampleFile" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">{t('category')}</Label>
          <Input
            type="select"
            name="category_news_id"
            value={formState.values.category_news_id}
            onChange={handleChange}
          >
            <option value={0}>Tin tức</option>
            <option value={1}>Doanh nghiệp</option>
            <option value={2}>Hoạt động</option>
          </Input>
        </FormGroup>
        <Button color="primary" type="submit">
          Sửa
        </Button>
      </Form>
    </React.Fragment>
  );
}

Edit.propTypes = PropsType;

const mapStateToProps = state => {
  return { detail: state.NewReducer.detail };
};

const mamapDispatchToProps = {
  editNew: NewActions.EditNew
};

export default connect(
  mapStateToProps,
  mamapDispatchToProps
)(Edit);
