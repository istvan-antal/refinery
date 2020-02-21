import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, Props } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faCloudUploadAlt);

const UploadIcon = (props: Partial<Props>) => (
    <FontAwesomeIcon icon="cloud-upload-alt" size="3x" {...props} />
);

export default UploadIcon;