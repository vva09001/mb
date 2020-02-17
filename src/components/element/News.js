import React, { useState, useEffect } from 'react';
import { map, filter } from 'lodash';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { FormNews } from '../form';
import moment from 'moment';

function News({ data, indexElement, listCategory, listNew, onRender, getNewsByCategoryID }) {
  const [formState, setFormState] = useState({});
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState(false);
  const [errorLimit, setErrorLimit] = useState(false);
  const [errorNews, setErrorNews] = useState(false);

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
    if (event.target.name === 'limit') {
      setErrors(false);
    }
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

  const renderElement = formData => {
    let value = formData === undefined ? formState : formData;
    let element = (
      <div className="post_block mb-5 pt-4">
        <div className="title">
          <h2>{formState.title}</h2>
        </div>
        <div className="row">
          {map(value.news, data => (
            <div className="col-sm-4" key={data.newsId}>
              <div className="post_content mb-3">
                <div>
                  <img src={data.base_image} alt="icon" />
                </div>
                <div className="content">
                  <div className="date mt-4">
                    <p>{moment(data.created_at).format('DD-MM-YYYY')}</p>
                  </div>
                  <p className="title">{data.title}</p>
                  <p className="show">
                    <a href={`/news/${data.url}`}>Xem thêm</a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="btn">
          <button>Xem tất cả</button>
        </div>
      </div>
    );
    onRender(element, indexElement, title, value);
  };

  const onSave = () => {
    if (formState.news === undefined || formState.limit === undefined) {
      if (formState.limit === undefined) {
        setErrorLimit(true);
      }
      if (formState.news === undefined) {
        setErrorNews(true);
      }
      return;
    }
    let limit = parseInt(formState.limit);
    let count = limit - formState.news.length;
    let list = [];
    let listData = [];
    if (limit > listNew.length) {
      setErrors(true);
    }
    if (formState.news.length < limit) {
      listData = listNew.sort((date_1, date_2) => {
        return date_2.created_at - date_1.created_at;
      });
      map(formState.news, value => {
        return (listData = filter(listData, data => {
          return data.newsId !== value.newsId;
        }));
      });

      for (let i = 0; i < count; i++) {
        list = [...list, listData[i]];
      }
      let body = {
        ...formState,
        news: [...formState.news, ...list]
      };
      setFormState(body);
      renderElement(body);
    } else {
      renderElement();
    }
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
      <FormNews
        listCategory={listCategory}
        listNew={listNew}
        value={formState}
        errors={errors}
        errorNews={errorNews}
        errorLimit={errorLimit}
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
