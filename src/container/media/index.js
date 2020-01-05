import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MediaActions } from '../../store/actions';
import { connect } from 'react-redux';
import Moment from 'moment';
import FileBrowser from 'react-keyed-file-browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faFolderMinus, faFolderOpen, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

const PropsType = {
  data: PropTypes.array,
  getImages: PropTypes.func,
  detail: PropTypes.object,
  deleteImages: PropTypes.func,
  addFiles: PropTypes.func,
  getDetailImage: PropTypes.func
};

function Media({ data, getImages, detail, deleteImages, addFiles, getDetailImage }) {
  const [formState, setFormState] = useState([]);

  var formData = new FormData();

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
    formData.append('file', files[0]);
    formData.append('folderName', path);
    console.log(files[0]);
    console.log(formData);
    addFiles(formData);
  };

  const handleRenameFile =(a,prefix) =>{
    console.log(a);
    let re = /[/]/g
    console.log(prefix.substring(prefix.lastIndexOf('/')+1, prefix.length));
    
    
  }
  const handleDeleteFolder = key => {
    console.log(key);
  };

  const handleBrowse = key => {   
    getDetailImage(key);
    
  };
  const handleDeleteFile = () => {        
    deleteImages(detail.id)

  }
  const handleRenameFolder = (oldKey, newKey) => {
    this.setState(state => {
      const newFiles = [];
      state.files.map(file => {
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
      state.files = newFiles;
      return state;
    });
  };
  console.log(formState);
  return (
    <React.Fragment>
      <div style={{ backgroundColor: 'white', padding: 20 }}>
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
          onMoveFolder={handleRenameFolder}
          onRenameFolder={handleRenameFolder}
          onDeleteFolder={handleDeleteFolder}
          onSelectFile={handleBrowse}
          onDeleteFile={handleDeleteFile}
          onRenameFile={handleRenameFile}
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
  deleteImages: MediaActions.DeleteImages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Media);
