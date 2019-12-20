import React, { Fragment } from 'react';
import CardSummary from 'components/dashboard/CardSummary';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="card-deck">
        <CardSummary loadingValue={0} acceptValue={0} color="warning" linkText={t('customer.personal')} />
        <CardSummary loadingValue={0} acceptValue={0} color="info" linkText={t('customer.enterprise')} />
        <CardSummary loadingValue={0} acceptValue={0} color="success" linkText={t('customer.institutions')} />
        <CardSummary loadingValue={0} acceptValue={0} color="info" linkText={t('customer.premium')} />
      </div>
    </Fragment>
  );
};

export default Dashboard;
