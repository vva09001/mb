import React from 'react';
import { Form, Label, Input, FormGroup } from 'reactstrap';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import Proptypes from 'prop-types';

const Proptype = {
  value: Proptypes.object,
  listPage: Proptypes.array,
  handleChange: Proptypes.func,
  removeBlock: Proptypes.func,
  onSave: Proptypes.func
};

function FormProduct({ value, listPage, handleChange, handleChangePage, onSave }) {
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
        <Label for="template">{t('block_page.img_type')}</Label>
        <Input
          type="select"
          name="type"
          required
          value={value.type === undefined ? 0 : value.type}
          onChange={event => handleChange(event)}
        >
          <option value={0}>{t('select')}</option>
          <option value={1}>{t('baseImages')}</option>
          <option value={2}>{t('miniImages')}</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>{t('page.page')}</Label>
        <Select
          name="page"
          isMulti
          closeMenuOnSelect={false}
          value={value.page === undefined ? '' : value.page}
          options={listPage}
          onChange={event => handleChangePage(event)}
        />
      </FormGroup>
    </Form>
  );
}

FormProduct.propTypes = Proptype;

export default FormProduct;
