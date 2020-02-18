import React, { useState, useEffect } from 'react';
import { map } from 'lodash';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { FormProduct } from '../form';

function Product({ data, indexElement, listPage, onRender }) {
  const [formState, setFormState] = useState({});
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (data && data.content !== undefined && data.title !== undefined) {
      setTitle(data.title);
      setFormState(JSON.parse(data.content));
    }
  }, [data]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      [event.target.name]: event.target.value
    }));
  };
  const handleChangePage = data => {
    setFormState(formState => ({
      ...formState,
      page: data
    }));
  };

  const renderElement = formData => {
    let value = formData === undefined ? formState : formData;
    let element = (
      <div className="post_block mb-5 pt-4">
        <div className="title">
          <h2>{formState.title}</h2>
        </div>
        <div className="row">
          {map(value.page, data => {
            if (formState.type === '1' || formState.type === undefined) {
              return (
                <div className="col-sm-4" key={data.id}>
                  <div className="post_content mb-3">
                    <div>
                      <a href={`page/${data.slug}`}>
                        <img src={data.baseImage} alt="icon" />
                      </a>
                    </div>
                    <div className="content">
                      <a href={`page/${data.slug}`}>
                        <p className="title">{data.name}</p>
                      </a>
                      <p className="text_content">{data.meta_description}</p>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="col-sm-4">
                  <div className="row mb-3 mr-4 page_wapper">
                    <div className="col-sm-5 img_wapper">
                      <a href={`page/${data.slug}`}>
                        <img src={data.miniImage} alt="icon" />
                      </a>
                    </div>
                    <div className="col-sm-7 content">
                      <a href={`page/${data.slug}`}>
                        <p className="title">{data.name}</p>
                      </a>
                      <p className="text_content">{data.meta_description}</p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
    onRender(element, indexElement, title, value);
  };

  const onSave = () => {
    renderElement();
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
      <FormProduct
        listPage={listPage}
        value={formState}
        handleChangePage={handleChangePage}
        handleChange={handleChange}
      />
      <div className="mt-3">
        <Button onClick={onSave}>Save</Button>
      </div>
    </React.Fragment>
  );
}

export default Product;
