import React from 'react';
import { Form, Label, Input, FormGroup } from 'reactstrap';
import Select from 'react-select';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import Proptypes from 'prop-types';

const Proptype = {
  value: Proptypes.object,
  errors: Proptypes.bool,
  errorLimit: Proptypes.bool,
  handleChange: Proptypes.func,
  removeBlock: Proptypes.func,
  handleImage: Proptypes.func,
  onSave: Proptypes.func
};

function FormNews({
  value,
  errors,
  errorLimit,
  errorNews,
  listCategory,
  listNew,
  handleChange,
  handleChangeNew,
  getNewsByCategoryID,
  onSave
}) {
  const { t } = useTranslation();
  return (
    <Form onSubmit={onSave}>
      <FormGroup>
        <Label>{t('block.image.title')}</Label>
        <Input type="text" name="title" value={value.title} onChange={event => handleChange(event)} />
      </FormGroup>
      <FormGroup>
        <Label>{t('Limit')}</Label>
        <Input type="number" name="limit" value={value.limit} onChange={event => handleChange(event)} />
        {errors && <span style={{ color: 'red' }}>{t('errors.limit')}</span>}
        {errorLimit && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
      </FormGroup>
      <FormGroup>
        <Label>{t('category')}</Label>
        <Input
          type="select"
          name="category"
          value={value.category}
          onChange={event => getNewsByCategoryID(event.target.value)}
        >
          <option value={0}>{t('select')}</option>
          {map(listCategory, category => {
            return (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            );
          })}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>{t('news')}</Label>
        <Select
          name="news"
          closeMenuOnSelect={false}
          value={value.news}
          options={listNew}
          isMulti
          onChange={event => handleChangeNew(event)}
        />
        {errorNews && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
      </FormGroup>
    </Form>
  );
}

FormNews.propTypes = Proptype;

export default FormNews;
