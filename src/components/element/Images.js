import React, { useState, useEffect } from 'react';
import { map, filter } from 'lodash';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { FromImages } from '../form';
import { connect } from 'react-redux';

function Images({ data, onRender, imageSeletedata, indexElement }) {
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
      <div className="block_images">
        <p className="title">{formState[0].title}</p>
        {map(formState, (data, index) => {
          if (data.type === '1') {
            return (
              <div className="block_imege_left mb-5" key={index}>
                <h2 className="title mb-5">{data.note_1}</h2>
                <div className="row">
                  <div className="col-sm-7">
                    <img src={data.image} alt="icon" />
                  </div>
                  <div className="col-sm-5">
                    <p>{data.note_2}</p>
                    <button>
                      <a href={data.url === undefined ? '#' : data.url}>
                        {data.text_action === undefined ? 'Đăng ký ngay' : data.text_action}
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="block_imege_left mb-5" key={index}>
                <h2 className="title mb-5">{data.note_1}</h2>
                <div className="row">
                  <div className="col-sm-5">
                    <p>{data.note_2}</p>
                    <button>
                      <a href={data.url === undefined ? '#' : data.url}>
                        {data.text_action === undefined ? 'Đăng ký ngay' : data.text_action}
                      </a>
                    </button>
                  </div>
                  <div className="col-sm-7">
                    <img src={data.image} alt="icon" />
                  </div>
                </div>
              </div>
            );
          }
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
          <FromImages
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
)(Images);
