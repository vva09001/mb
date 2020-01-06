import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MediaActions } from '../../store/actions';
import { connect } from 'react-redux';
import FileBrowser from 'react-keyed-file-browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faFolderMinus, faFolderOpen, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import MediaDetail from '../../components/Media';
import { useTranslation } from 'react-i18next';

const PropsType = {
  data: PropTypes.array,
  getImages: PropTypes.func,
  detail: PropTypes.object,
  deleteImages: PropTypes.func,
  addFiles: PropTypes.func,
  getDetailImage: PropTypes.func,
  moveFolder: PropTypes.func,
  moveFile: PropTypes.func
};

function Media({ data, getImages, detail, deleteImages, addFiles, getDetailImage, moveFolder, moveFile }) {
  const [formState, setFormState] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getImages();
  }, [getImages]);

  useEffect(() => {
    setFormState(data);
  }, [data]);

  const handleCreateFolder = key => {
    setFormState(formState => {
      formState = formState.concat([
        {
          key: key
        }
      ]);
      return formState;
    });
  };
  const onCreateFiles = (files, path) => {
    let formData = new FormData();
    console.log(files[0].size);
    formData.append('file', files[0]);
    formData.append('folderName', path);
    formData.append('size', files[0].size);
    addFiles(formData);
  };

  const handleRenameFile = (a, prefix) => {
    let renameData = new FormData();
    let NewName = prefix.substring(prefix.lastIndexOf('/') + 1, prefix.length);
    renameData.append('name', NewName);
    renameData.append('path', '');
    moveFile(detail.id, renameData);
  };
  const handleMoveFile = (a, prefix) => {
    let moveFileData = new FormData();
    let pathNew = prefix.substring(0, prefix.lastIndexOf('/') + 1);
    moveFileData.append('name', detail.name);
    moveFileData.append('path', pathNew);
    moveFile(detail.id, moveFileData);
  };
  const handleDeleteFolder = key => {
    console.log(key);
  };

  const handleBrowse = key => {
    getDetailImage(key);
  };
  const handleDeleteFile = () => {
    deleteImages(detail.id);
  };
  const handleMoveFolder = (oldKey, newKey) => {
    let moveFolderData = new FormData();
    moveFolderData.append('pathOld', oldKey);
    moveFolderData.append('pathNew', newKey);
    moveFolder(moveFolderData);
  };
  const handleRenameFolder = (oldKey, newKey) => {
    console.log(oldKey);
    console.log(newKey);
  };
  return (
    <React.Fragment>
      <h4>{t('Media')}</h4>
      <div style={{ backgroundColor: 'white', padding: 20, height: '600px' }}>
        <FileBrowser
          files={formState}
          icons={{
            File: <FontAwesomeIcon icon={faEdit} />,
            Image: <FontAwesomeIcon icon={faImages} />,
            PDF: <i className="file-pdf" aria-hidden="true" />,
            Rename: <FontAwesomeIcon icon={faEdit} />,
            Folder: <FontAwesomeIcon icon={faFolderMinus} />,
            FolderOpen: <FontAwesomeIcon icon={faFolderOpen} />,
            Delete: <FontAwesomeIcon icon={faTimes} />,
            Loading: <FontAwesomeIcon icon={faEdit} />
          }}
          onCreateFolder={handleCreateFolder}
          onCreateFiles={onCreateFiles}
          onMoveFolder={handleMoveFolder}
          onMoveFile={handleMoveFile}
          onRenameFolder={handleRenameFolder}
          // onDeleteFolder={handleDeleteFolder}
          onSelectFile={handleBrowse}
          onDeleteFile={handleDeleteFile}
          onRenameFile={handleRenameFile}
          detailRenderer={MediaDetail}
        />
      </div>
    </React.Fragment>
  );
}

Media.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    data: state.MediaReducer.data,
    detail: state.MediaReducer.detail
  };
};

const mapDispatchToProps = {
  getImages: MediaActions.GetImages,
  addFiles: MediaActions.AddImages,
  getDetailImage: MediaActions.GetDetailImage,
  deleteImages: MediaActions.DeleteImages,
  moveFolder: MediaActions.MoveFolder,
  moveFile: MediaActions.MoveFile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Media);
