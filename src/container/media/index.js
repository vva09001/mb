import React from 'react';
import { Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';

function Media() {
  const { t } = useTranslation();
  return (
    <Row>
      <h4>{t('media.title')}</h4>
    </Row>
  );
}

export default Media;
