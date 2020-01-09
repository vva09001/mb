import React, { useEffect } from 'react';
import { Row } from 'reactstrap';
import DeleteFileTable from '../../components/Media/DeleteFiles';
import PropTypes from 'prop-types';
import { MediaActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';

import { connect } from 'react-redux';

const PropsType = {
  data: PropTypes.array,
  getFile: PropTypes.func,
  deleteImage: PropTypes.func
};

function DeleteFiles({ data, getFile, deleteImage }) {
  useEffect(() => {
    getFile();
  }, [getFile]);

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div>
        <Row>
          <h4>{t('DeleteImage')}</h4>
        </Row>
        <Row style={{ background: '#fff' }} className="p-3">
          <DeleteFileTable data={data} deleteImage={deleteImage} />
        </Row>
      </div>
    </React.Fragment>
  );
}

DeleteFiles.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.MediaReducer.ListFiles };
};

const mapDispatchToProps = {
  getFile: MediaActions.GetImages,
  deleteImage: MediaActions.DeleteListImage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteFiles);
