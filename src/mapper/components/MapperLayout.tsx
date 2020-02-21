import React, { ReactNode } from 'react';

import './MapperLayout.scss';

interface Props {
    children: ReactNode;
}

const MapperLayout = ({ children }: Props) => (
    <div className="MapperLayout">
        {children}
    </div>
);

export default MapperLayout;