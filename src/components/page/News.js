import React from 'react';
import { Alert, Col, Row } from 'reactstrap';
import Loader from '../common/Loader';
import FalconCardHeader from '../common/FalconCardHeader';
import New from '../new/New';
import { isIterableArray } from '../../helpers/utils';
import rawNews from '../../data/news/news';
import useFakeFetch from '../../hooks/useFakeFetch';

const News = () => {
  const { loading, data: news } = useFakeFetch(rawNews);

  return (
    <Row className="mb-3">
      <FalconCardHeader title="News" />
      <div className="fs--1">
        {loading ? (
          <Loader />
        ) : isIterableArray(news) ? (
          <Row>
            {news.map((item, index) => (
              <Col sm={12} md={12} className="mb-3" key={index}>
                <New {...item} />
              </Col>
            ))}
          </Row>
        ) : (
          <Alert color="info" className="mb-0">
            No association found
          </Alert>
        )}
      </div>
    </Row>
  );
};

export default News;
