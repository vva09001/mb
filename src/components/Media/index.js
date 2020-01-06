import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PropsTypes = {
  detail: PropTypes.object
};

function MediaDetail({ detail }) {
    const { t } = useTranslation();
    const [file, setFile] = useState({detail});

    return(
        <React.Fragment>
            <div>
                <h4>{file.name}</h4>
            </div>
        </React.Fragment>

        
    );

};

MediaDetail.propTypes = PropsTypes;

export default MediaDetail;