import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MediaActions } from '../../store/actions';
import { connect } from 'react-redux';
import FileBrowser, { FileRenderers } from 'react-keyed-file-browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faFolderMinus, faFolderOpen, faEdit, faTimes, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import MediaDetail from '../../components/Media';
import { useTranslation } from 'react-i18next';
import { map } from 'lodash';
import { Button, Row } from 'reactstrap';
import history from 'helpers/history';

const PropsType = {
  data: PropTypes.array,
  getImages: PropTypes.func,
  detail: PropTypes.object,
  deleteImages: PropTypes.func,
  addFiles: PropTypes.func,
  getDetailImage: PropTypes.func,
  moveFolder: PropTypes.func,
  moveFile: PropTypes.func,
  renameFolder: PropTypes.func,
  createFolder: PropTypes.func,
  deleteFolder: PropTypes.func,
  getPathFolder: PropTypes.func,
  PathFolder: PropTypes.string
};

function Media({
  data,
  getImages,
  detail,
  deleteImages,
  addFiles,
  getDetailImage,
  moveFolder,
  moveFile,
  renameFolder,
  createFolder,
  deleteFolder,
  getPathFolder,
  PathFolder
}) {
  const [isFolder, setIsFolder] = useState(true);
  const [formState, setFormState] = useState([]);
  const [thumnail, setThumnail] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    getImages();
  }, [getImages]);

  useEffect(() => {
    setFormState(data);
  }, [data]);

  const handleChange = event => {
    event.persist();
    let formData = new FormData();
    map(event.target.files, value => {
      formData.append('files', value);
    });
    formData.append('folderName', PathFolder);
    addFiles(formData);
  };
  const handleCreateFolder = key => {
    let createFolderData = new FormData();
    createFolderData.append('path', key);
    createFolder(createFolderData);
  };
  const onCreateFiles = (files, path) => {
    let formData = new FormData();
    map(files, value => {
      formData.append('files', value);
    });
    formData.append('folderName', path);
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
    let deleteFolderData = new FormData();
    deleteFolderData.append('path', key);
    deleteFolder(deleteFolderData);
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
    let renameFolderData = new FormData();
    renameFolderData.append('folderOld', oldKey);
    renameFolderData.append('folderNew', newKey);
    renameFolder(renameFolderData);
  };

  const handleFolder = key => {
    setIsFolder(false);
    getPathFolder(key);
  };

  window.__isReactDndBackendSetUp = false;

  return (
    <React.Fragment>
      <h4>{t('Media')}</h4>
      <input type="file" id="file" style={{ display: 'none' }} onChange={handleChange} multiple />
      <div style={{ backgroundColor: 'white', padding: 20, height: 'auto' }}>
        <Row>
          <div style={{ paddingBottom: 10, paddingRight: 10 }}>
            <Button
              color={'primary'}
              onClick={() => {
                document.getElementById('file').click();
              }}
              disabled={isFolder}
            >
              {t('UploadFile')}
            </Button>
          </div>
          <div style={{ paddingBottom: 10, paddingRight: 10 }}>
            <Button
              color={'danger'}
              onClick={() => {
                history.push('/media/deleteFiles');
              }}
            >
              {t('DeleteFiles')}
            </Button>
          </div>
          <div style={{ paddingBottom: 10 }}>
            <Button
              color={'info'}
              onClick={() => {
                setThumnail(!thumnail);
              }}
            >
              {t('ListView')}
            </Button>
          </div>
        </Row>
        <div>
          <FileBrowser
            files={formState}
            icons={{
              File: <FontAwesomeIcon icon={faEdit} />,
              Image: <FontAwesomeIcon icon={faImages} />,
              PDF: <FontAwesomeIcon icon={faFilePdf} />,
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
            onDeleteFolder={handleDeleteFolder}
            onSelectFile={handleBrowse}
            onSelectFolder={handleFolder}
            onDeleteFile={handleDeleteFile}
            onRenameFile={handleRenameFile}
            fileRenderer={thumnail === true ? FileRenderers.ListThumbnailFile : FileRenderers.TableFile}
            detailRenderer={MediaDetail}
            renderStyle={thumnail === true ? 'list' : 'table'}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

Media.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    data: state.MediaReducer.data,
    detail: state.MediaReducer.detail,
    PathFolder: state.MediaReducer.PathFolder
  };
};

const mapDispatchToProps = {
  getImages: MediaActions.GetImages,
  addFiles: MediaActions.AddImages,
  getDetailImage: MediaActions.GetDetailImage,
  deleteImages: MediaActions.DeleteImages,
  moveFolder: MediaActions.MoveFolder,
  moveFile: MediaActions.MoveFile,
  renameFolder: MediaActions.RenameFolder,
  createFolder: MediaActions.CreatFolder,
  deleteFolder: MediaActions.DeleteFolder,
  getPathFolder: MediaActions.GetPathFolder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Media);
