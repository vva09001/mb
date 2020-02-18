import React from 'react';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from 'services/uploadImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import Proptypes from 'prop-types';

const Proptype = {
  value: Proptypes.object,
  index: Proptypes.number,
  handleChange: Proptypes.func,
  removeBlock: Proptypes.func,
  handleEditor: Proptypes.func,
  onSave: Proptypes.func
};

function FormRepeat({ value, index, handleChange, handleEditor, removeBlock, onSave }) {
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
      <FormGroup>
        <CKEditor
          editor={ClassicEditor}
          data={value.description}
          onChange={(event, editor) => {
            const editorData = editor.getData();
            handleEditor(editorData, index);
          }}
          onInit={editor => {
            editor.plugins.get('FileRepository').createUploadAdapter = function(loader) {
              return new UploadAdapter(loader);
            };
          }}
        />
      </FormGroup>
    </Form>
  );
}

FormRepeat.propTypes = Proptype;

export default FormRepeat;
