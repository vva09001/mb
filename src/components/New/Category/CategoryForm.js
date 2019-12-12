import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PropType = {
  deleteActive: PropTypes.bool,
  value: PropTypes.object,
  handleChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func
};

const CategoryForm = ({ deleteActive, value, handleChange, onSubmit, onDelete }) => {
  const { t } = useTranslation();
  return (
    <Form onSubmit={onSubmit} className="cetegoryFrom">
      <FormGroup>
        <Label>{t('name')}</Label>
        <Input name="name" value={value.name === undefined ? '' : value.name} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <div className="check__box">
          <Label>{t('category_page.form.search')}</Label>
          <div>
            <Input type="checkbox" name="search_active" value={value.search_active} onChange={handleChange} />
            <span>{t('category_page.form.displayCategory')}</span>
          </div>
        </div>
      </FormGroup>
      <FormGroup>
        <div className="check__box">
          <Label>{t('category_page.form.active')}</Label>
          <div>
            <Input
              type="checkbox"
              name="is_active"
              checked={value.is_active === 0 || value.is_active === undefined ? false : true}
              value={value.is_active === 0 ? false : value.is_active}
              // checked={}
              onChange={handleChange}
            />
            <span>{t('category_page.form.activeCategory')}</span>
          </div>
        </div>
      </FormGroup>
      <FormGroup>
        <Label>{t('description')}</Label>
        <Input
          type="textarea"
          name="description"
          value={value.description === undefined ? '' : value.description}
          onChange={handleChange}
        />
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
      {deleteActive && (
        <Button color="danger" className="ml-2" onClick={onDelete}>
          {t('delete')}
        </Button>
      )}
    </Form>
  );
};

CategoryForm.propTypes = PropType;

export default CategoryForm;
