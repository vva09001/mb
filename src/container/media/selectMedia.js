import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MediaActions } from '../../store/actions';
import { connect } from 'react-redux';
import FileBrowser, { FileRenderers } from 'react-keyed-file-browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faFolderMinus, faFolderOpen, faEdit, faTimes, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Notthing from '../../components/Media/nothing';
import { useTranslation } from 'react-i18next';
import { map } from 'lodash';
import { Button, Row } from 'reactstrap';

const PropsType = {
  data: PropTypes.array,
  getImages: PropTypes.func,
  detail: PropTypes.object,
  getDetailImage: PropTypes.func,
  selectImage: PropTypes.func,

  addFiles: PropTypes.func,
  getPathFolder: PropTypes.func,
  createFolder: PropTypes.func,
  PathFolder: PropTypes.string,
  renameFolder: PropTypes.func
};

function SelectMedia({
  data,
  getImages,
  getDetailImage,
  addFiles,
  getPathFolder,
  createFolder,
  PathFolder,
  renameFolder
}) {
  const [formState, setFormState] = useState([]);
  const [isFolder, setIsFolder] = useState(true);
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

  const handleBrowse = key => {
    getDetailImage(key);
  };

  const handleFolder = key => {
    setIsFolder(false);
    getPathFolder(key);
  };

  const handleRenameFolder = (oldKey, newKey) => {
    let renameFolderData = new FormData();
    renameFolderData.append('folderOld', oldKey);
    renameFolderData.append('folderNew', newKey);
    renameFolder(renameFolderData);
  };

  const handleCreateFolder = key => {
    let createFolderData = new FormData();
    createFolderData.append('path', key);
    createFolder(createFolderData);
  };

  window.__isReactDndBackendSetUp = false;
  return (
    <React.Fragment>
      <h4>{t('Media')}</h4>
      <input type="file" id="file" style={{ display: 'none' }} onChange={handleChange} multiple />
      <div style={{ backgroundColor: 'white', maxHeight: '500px', overflow: 'auto' }}>
        <Row>
          <div style={{ paddingBottom: 10, paddingRight: 10 }}>
            <Button
              color={'primary'}
              onClick={() => {
                document.getElementById('file').click();
              }}
              disabled={isFolder}
              style={{marginLeft: 16}}
            >
              {t('UploadFile')}
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
            onSelectFile={handleBrowse}
            detailRenderer={Notthing}
            onCreateFolder={handleCreateFolder}
            onSelectFolder={handleFolder}
            onRenameFolder={handleRenameFolder}
            fileRenderer={thumnail === true ? FileRenderers.ListThumbnailFile : FileRenderers.TableFile}
            renderStyle={thumnail === true ? 'list' : 'table'}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

SelectMedia.propTypes = PropsType;

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
  selectImage: MediaActions.SeleteImage,
  getPathFolder: MediaActions.GetPathFolder,
  createFolder: MediaActions.CreatFolder,
  renameFolder: MediaActions.RenameFolder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectMedia);
