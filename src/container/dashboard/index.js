import React, { Fragment, useEffect } from 'react';
import CardSummary from 'components/dashboard/CardSummary';
import { map, filter } from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GroupActions } from '../../store/actions';

const PropsType = {
  data: PropTypes.array,
  getGroup: PropTypes.func,
  deleteGroup: PropTypes.func
};

function Dashboard({ data, getGroup }) {
  useEffect(() => {
    getGroup();
  }, [getGroup]);
  return (
    <Fragment>
      <div className="card-deck">
        {map(data, values => (
          <CardSummary
            key={values.id}
            loadingValue={filter(values.pages, { is_active: 0 }).length}
            acceptValue={filter(values.news, { is_active: 0 }).length}
            color="success"
            linkText={values.name}
            to={`/appr/${values.idTeam}`}
          />
        ))}
      </div>
    </Fragment>
  );
}

Dashboard.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.GroupReducer.listGroupByUser };
};

const mapDispatchToProps = {
  getGroup: GroupActions.getGroupByUserAction,
  deleteGroup: GroupActions.deleteGroupAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
