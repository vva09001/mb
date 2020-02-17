import React from 'react';
import { Form, Label, Input, FormGroup } from 'reactstrap';
import Select from 'react-select';
import { map } from 'lodash';
import { useTranslation } from 'react-i18next';
import Proptypes from 'prop-types';

const Proptype = {
  value: Proptypes.object,
  errors: Proptypes.bool,
  handleChange: Proptypes.func,
  removeBlock: Proptypes.func,
  handleImage: Proptypes.func,
  onSave: Proptypes.func
};

function FormNews({
  value,
  errors,
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
        <Input
          type="text"
          name="title"
          value={value.title === undefined ? '' : value.title}
          onChange={event => handleChange(event)}
        />
      </FormGroup>
      <FormGroup>
        <Label>{t('category')}</Label>
        <Input
          type="select"
          name="category"
          value={value.category === undefined ? '' : value.category}
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
          value={value.news === undefined ? '' : value.news}
          options={listNew}
          onChange={event => handleChangeNew(event)}
        />
        {errors && <span style={{ color: 'red' }}>{t('errors.required')}</span>}
      </FormGroup>
    </Form>
  );
}

FormNews.propTypes = Proptype;

export default FormNews;
