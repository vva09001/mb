import React from 'react';
import { Form, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

const SearchBox = () => {
  const { t } = useTranslation();
  return (
    <Form inline className="search-box">
      <Input type="search" placeholder={t('search')} aria-label="Search" className="rounded-pill search-input" />
      <FontAwesomeIcon icon="search" className="position-absolute text-400 search-box-icon" />
    </Form>
  );
};

export default SearchBox;
