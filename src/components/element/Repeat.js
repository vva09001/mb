import React, { useState, useEffect } from 'react';
import { map, filter } from 'lodash';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { FormRepeat } from '../form';
import ReactDOMServer from 'react-dom/server';

function Repeat({ data, onRender, indexElement }) {
  const [formState, setFormState] = useState([{}]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (data && data.content !== undefined && data.title !== undefined) {
      setTitle(data.title);
      setFormState(JSON.parse(data.content));
    }
  }, [data]);

  const handleChange = (event, indexElement) => {
    let data = map(formState, (value, index) => {
      if (indexElement !== index) {
        return value;
      } else {
        return {
          ...value,
          [event.target.name]:
            event.target.type === 'checkbox' ? (event.target.checked === false ? 0 : 1) : event.target.value
        };
      }
    });
    setFormState(data);
  };

  const handleEditor = (editorData, indexElement) => {
    let data = map(formState, (value, index) => {
      if (indexElement !== index) {
        return value;
      } else {
        return {
          ...value,
          editor: editorData
        };
      }
    });
    setFormState(data);
  };

  const addElement = () => {
    setFormState([...formState, {}]);
  };
  const removeBlock = index => {
    let data = filter(formState, (item, itemIndex) => itemIndex !== index);
    setFormState(data);
  };

  const onSave = () => {
    let element = (
      <div className="eidtor_wapper">
        <p className="title">{formState[0].title}</p>
        {map(formState, (data, index) => {
          return (
            <div className="eidtor_content mb-5" key={index}>
              {ReactDOMServer.renderToString(data.editor)}
            </div>
          );
        })}
      </div>
    );
    onRender(element, indexElement, title, formState);
  };

  return (
    <React.Fragment>
      <FormGroup>
        <Label>Tên khối</Label>
        <Input
          name="title"
          type="text"
          value={title}
          placeholder="Title"
          onChange={event => setTitle(event.target.value)}
        />
      </FormGroup>
      {map(formState, (value, index) => {
        return (
          <FormRepeat
            key={index}
            index={index}
            value={value}
            handleChange={handleChange}
            handleEditor={handleEditor}
            removeBlock={removeBlock}
            onSave={onSave}
          />
        );
      })}
      <div className="mt-3">
        <Button className="mr-2" onClick={addElement}>
          Add
        </Button>
        <Button onClick={onSave}>Save</Button>
      </div>
    </React.Fragment>
  );
}

export default Repeat;
