import React, { useState, useEffect } from 'react';
import { map, filter } from 'lodash';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { FormIcon } from '../form';
import { connect } from 'react-redux';

function Icon({ data, onRender, imageSeletedata, indexElement }) {
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

  const handleImage = indexElement => {
    let data = map(formState, (value, index) => {
      if (indexElement !== index) {
        return value;
      } else {
        return {
          ...value,
          image: imageSeletedata.url
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
      <div className="mutile_icon">
        <p className="title">{formState[0].title}</p>
        <div className="row">
          {map(formState, (data, index) => (
            <div className="col-sm-4 mb-5" key={index}>
              <div className="icon_items">
                <div className="icon">
                  <a href={data.url}>
                    <img src={data.image} alt="icon" className="mb-3" />
                  </a>
                </div>
                <div className="icon_title">
                  <a href={data.url}>
                    <p>{data.note_1}</p>
                  </a>
                </div>
                <div className="icon_content">
                  <p className="text_content">{data.note_2}</p>
                  <p className="content_sub">{data.note_3}</p>
                </div>
                <div className="icon_button">
                  <a href={data.url}>{data.text_action}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
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
          <FormIcon
            key={index}
            index={index}
            value={value}
            handleChange={handleChange}
            handleImage={handleImage}
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

const mapStateToProps = state => {
  return {
    imageSeletedata: state.MediaReducer.detail
  };
};

export default connect(
  mapStateToProps,
  null
)(Icon);
