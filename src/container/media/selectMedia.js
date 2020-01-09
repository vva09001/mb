import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MediaActions } from '../../store/actions';
import { connect } from 'react-redux';
import FileBrowser from 'react-keyed-file-browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faFolderMinus, faFolderOpen, faEdit, faTimes, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Notthing from '../../components/Media/nothing';
import { useTranslation } from 'react-i18next';

const PropsType = {
  data: PropTypes.array,
  getImages: PropTypes.func,
  detail: PropTypes.object,
  getDetailImage: PropTypes.func,
  selectImage: PropTypes.func,
  closeModal: PropTypes.func
};

function SelectMedia({ data, getImages, getDetailImage, selectImage, detail, closeModal }) {
  const [formState, setFormState] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getImages();
  }, [getImages]);

  useEffect(() => {
    setFormState(data);
  }, [data]);

  const handleBrowse = key => {
    getDetailImage(key);
  };

  const onSeleteImage = () => {
    closeModal();
  };

  return (
    <React.Fragment>
      <h4>{t('Media')}</h4>
      <div style={{ backgroundColor: 'white', padding: 20, maxHeight: '600px', width: '600px' }}>
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
        />
        <div>
          <button onClick={onSeleteImage}>{t('SlectImage')}</button>
        </div>
      </div>
    </React.Fragment>
  );
}

SelectMedia.propTypes = PropsType;

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
  selectImage: MediaActions.SeleteImage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectMedia);
