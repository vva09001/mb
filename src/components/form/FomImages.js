import React from 'react';
import { Form, Label, Input, Button, FormGroup } from 'reactstrap';
import ModalMedia from 'components/Media/ModalMedia';
import IconNoImage from 'assets/img/mb/no_image.png';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Proptypes from 'prop-types';

const Proptype = {
  value: Proptypes.object,
  index: Proptypes.number,
  handleChange: Proptypes.func,
  removeBlock: Proptypes.func,
  handleImage: Proptypes.func,
  onSave: Proptypes.func
};

function FomImages({ value, index, handleChange, handleImage, removeBlock, onSave }) {
  const { t } = useTranslation();

  return (
    <Form onSubmit={onSave}>
      {index === 0 && (
        <FormGroup>
          <Label>{t('block.image.title')}</Label>
          <Input
            type="text"
            name="title"
            value={value.title === undefined ? '' : value.title}
            onChange={event => handleChange(event, index)}
          />
        </FormGroup>
      )}
      <FormGroup className="mt-2 mb-2" style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
        <Button onClick={() => removeBlock(index)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </FormGroup>
      <Label for="template">{t('block_page.img_type')}</Label>
      <Input
        type="select"
        name="type"
        required
        value={value.type === undefined ? 0 : value.type}
        onChange={event => handleChange(event, index)}
      >
        <option value={0}>{t('select')}</option>
        <option value={1}>{t('block_page.img_left')}</option>
        <option value={2}>{t('block_page.img_right')}</option>
      </Input>
      <div className="form-img mt-3">
        <div>
          <div className="block_image mb-2">
            <img alt="items" src={value.image === undefined ? IconNoImage : value.image} style={{ maxWidth: '100%' }} />
          </div>
          <ModalMedia setState={() => handleImage(index)} />
        </div>
        <div className="input_image">
          <div className="input_wapper">
            <div>
              <Label>{t('block.image.title')}</Label>
              <Input
                type="text"
                name="note_1"
                value={value.note_1 === undefined ? '' : value.note_1}
                onChange={event => handleChange(event, index)}
              />
            </div>
            <div>
              <Label>{t('block.image.description')}</Label>
              <Input
                type="text"
                name="note_2"
                value={value.note_2 === undefined ? '' : value.note_2}
                onChange={event => handleChange(event, index)}
              />
            </div>
            <div>
              <Label>{t('block.image.learn_more')}</Label>
              <Input
                type="text"
                name="note_3"
                value={value.note_3 === undefined ? '' : value.note_3}
                onChange={event => handleChange(event, index)}
              />
            </div>
          </div>
          <div className="input_wapper">
            <div>
              <Label>{t('block.image.text')}</Label>
              <Input
                type="text"
                name="text_action"
                value={value.text_action === undefined ? '' : value.text_action}
                onChange={event => handleChange(event, index)}
              />
            </div>
            <div>
              <Label>{t('block.image.url')}</Label>
              <Input
                type="text"
                name="url"
                value={value.url === undefined ? '' : value.url}
                onChange={event => handleChange(event, index)}
              />
            </div>
            <div>
              <Label>{t('block.image.video_url')}</Label>
              <Input
                type="text"
                name="video_url"
                value={value.video_url === undefined ? '' : value.video_url}
                onChange={event => handleChange(event, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

FomImages.propTypes = Proptype;

export default FomImages;
