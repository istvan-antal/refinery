import React from 'react';
import classnames from 'classnames';
import UploadIcon from './icons/UploadIcon';

import './DropBox.scss';

const DropBox = ({ highlight }: { highlight?: boolean }) => (
    <div className={classnames('DropBox', { highlight })}>
        <div>
            <UploadIcon />
            <p>
                Drag and drop a .csv file to start analyzing.
            </p>
        </div>
    </div>
);

export default DropBox;