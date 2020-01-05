import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import NewTable from '../../components/New/Table';
import PropTypes, { array } from 'prop-types';
// import { MediaActions, NewActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import PopupComfirm from '../../components/common/PopupComfirm';
import history from '../../helpers/history';
import { connect } from 'react-redux';
import Moment from 'moment';
import FileBrowser from 'react-keyed-file-browser';
import { map } from 'lodash';
const PropsType = {
  data: PropTypes.array,
  getImages: PropTypes.func,
  detail: PropTypes.object,
  deleteImages: PropTypes.func
};

function Media({ data, getImages, detail, deleteImages }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newsID, setNewsID] = useState(null);
  // const [formState, setFormState] = useState({
  //   values: {},
  //   touched: {}
  // });

  useEffect(() => {
    getImages();
  }, [ getImages]);

    //   if (mediaID !== null) {
  //     setIsOpen(!isOpen);
  //   }
  // };
  let newbody = [];
  map(data , values => {

    newbody.push({
      key: values.path,
      modified: +Moment().subtract(25, 'days'),
      size: 85 * 1024
    });
      return newbody;
  })
  const [formState, setFormState] = useState({
    files: []
  });
  setFormState(formState => ({
    ...formState,
    values: newbody
  }));
  console.log(formState);
  return (
    <React.Fragment>
      <div>

          <FileBrowser
            files={formState.files}
          />

      </div>
    </React.Fragment>
  );
}

Media.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    // data: state.MediaReducer.data,
    // dataImages: state.MediaReducer.data
  };
};

const mapDispatchToProps = {
  // getImages: MediaActions.GetImages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Media);
