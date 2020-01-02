import React, { useState, useEffect } from 'react';
import { Row } from 'reactstrap';
import Moment from 'moment';
import FileBrowser from 'react-keyed-file-browser';
import { MediaActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import PopupComfirm from 'components/common/PopupComfirm';
import history from 'helpers/history';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { map } from 'lodash';

const PropsType = {
  data: PropTypes.array,
  detail: PropTypes.object,
  getImages: PropTypes.func,
  deleteImages: PropTypes.func
};
function Media(detail, data) {
  const [formState, setFormState] = useState({
    files: [
      {
        key: 'photos/animals/cat in a hat.png',
        modified: +Moment().subtract(1, 'hours'),
        size: 1.5 * 1024 * 1024
      },
      {
        key: 'photos/animals/kitten_ball.png',
        modified: +Moment().subtract(3, 'days'),
        size: 545 * 1024
      },
      {
        key: 'photos/animals/elephants.png',
        modified: +Moment().subtract(3, 'days'),
        size: 52 * 1024
      },
      {
        key: 'photos/funny fall.gif',
        modified: +Moment().subtract(2, 'months'),
        size: 13.2 * 1024 * 1024
      },
      {
        key: 'photos/holiday.jpg',
        modified: +Moment().subtract(25, 'days'),
        size: 85 * 1024
      },
      {
        key: 'documents/letter chunks.doc',
        modified: +Moment().subtract(15, 'days'),
        size: 480 * 1024
      },
      {
        key: 'documents/export.pdf',
        modified: +Moment().subtract(15, 'days'),
        size: 4.2 * 1024 * 1024
      }
    ]
  });

  const handleCreateFolder = key => {
    setFormState(formState => {
      formState.files = formState.files.concat([
        {
          key: key
        }
      ]);
      return formState;
    });
  };
  const handleRenameFolder = (oldKey, newKey) => {
    setFormState(formState => {
      const newFiles = [];
      map(formState.files, file => {
        if (file.key.substr(0, oldKey.length) === oldKey) {
          newFiles.push({
            ...file,
            key: file.key.replace(oldKey, newKey),
            modified: +Moment()
          });
        } else {
          newFiles.push(file);
        }
      });
      formState.files = newFiles;
      return formState;
    });
  };
  const handleDeleteFolder = folderKey => {
    console.log(folderKey);
  };

  const handleCreateFiles = () => {};
  return (
    <React.Fragment>
      <div>
        <Row className="category__wapper">
          <FileBrowser
            files={formState.files}
            onCreateFolder={handleCreateFolder}
            onCreateFiles={handleCreateFiles}
            onMoveFolder={handleRenameFolder}
            onRenameFolder={handleRenameFolder}
            onDeleteFolder={handleDeleteFolder}
          />
        </Row>
      </div>
    </React.Fragment>
  );
}

Media.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.MediaReducer.data };
};

const mapDispatchToProps = {
  getImages: MediaActions.GetImages,
  addImages: MediaActions.AddImages,
  editImages: MediaActions.EditImages,
  deleteImages: MediaActions.DeleteImages,
  getdetail: MediaActions.GetDetailImage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Media);
