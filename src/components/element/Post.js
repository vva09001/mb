import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { FormPost } from '../form';
import moment from 'moment';

function News({ data, indexElement, listCategory, listNew, onRender, getNewsByCategoryID }) {
  const [formState, setFormState] = useState({});
  const [title, setTitle] = useState('');
  const [errors, setErrorNews] = useState(false);

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
  const handleChangeNew = data => {
    setFormState(formState => ({
      ...formState,
      news: data
    }));
    setErrorNews(false);
  };

  const getNews = data => {
    setFormState(() => ({
      ...formState,
      category: data
    }));
    getNewsByCategoryID(data);
  };

  const renderElement = () => {
    let element = (
      <div className="block_imege_left mb-5">
        <h2 className="title mb-5">{formState.title}</h2>
        <div className="row">
          <div className="col-sm-7">
            <img src={formState.news.base_image} alt="icon" />
          </div>
          <div className="col-sm-5">
            <div className="content">
              <div className="date mt-4">
                <p>{moment(formState.news.created_at).format('DD-MM-YYYY')}</p>
              </div>
              <p className="title">{formState.news.title}</p>
              <p className="show">
                <a href={`/news/${formState.news.url}`}>Xem thêm</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
    onRender(element, indexElement, title, formState);
  };

  const onSave = () => {
    if (formState.news === undefined) {
      setErrorNews(true);
      return;
    }
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
      <FormPost
        listCategory={listCategory}
        listNew={listNew}
        value={formState}
        errors={errors}
        getNewsByCategoryID={getNews}
        handleChangeNew={handleChangeNew}
        handleChange={handleChange}
      />
      <div className="mt-3">
        <Button onClick={onSave}>Save</Button>
      </div>
    </React.Fragment>
  );
}

export default News;
