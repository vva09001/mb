import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PropType = {
  handleChange: PropTypes.func,
  onSubmit: PropTypes.func
};

const CategoryForm = ({ handleChange, onSubmit }) => {
  const { t } = useTranslation();
  return (
    <Form onSubmit={onSubmit} className="cetegoryFrom">
      <FormGroup>
        <Label>{t('name')}</Label>
        <Input type="text" name="name" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <div className="check__box">
          <Label>{t('category_page.form.search')}</Label>
          <div>
            <Input type="checkbox" onChange={handleChange} />
            <span>{t('category_page.form.displayCategory')}</span>
          </div>
        </div>
      </FormGroup>
      <FormGroup>
        <div className="check__box">
          <Label>{t('category_page.form.active')}</Label>
          <div>
            <Input type="checkbox" name="is_active" onChange={handleChange} />
            <span>{t('category_page.form.activeCategory')}</span>
          </div>
        </div>
      </FormGroup>
      <FormGroup>
        <Label>{t('description')}</Label>
        <Input type="textarea" name="description" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label>{t('category_page.form.coverImage')}</Label>
        <Input type="file" name="name" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label>{t('category_page.form.featuredImage')}</Label>
        <Input type="file" name="base_image" onChange={handleChange} />
      </FormGroup>

      <Button type="submit" color="primary">
        {t('save')}
      </Button>
    </Form>
  );
};

CategoryForm.propTypes = PropType;

export default CategoryForm;
