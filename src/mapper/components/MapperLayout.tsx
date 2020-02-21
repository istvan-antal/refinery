import React, { ReactNode } from 'react';

import './MapperLayout.scss';

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => (
    <div className="Layout">
        {children}
    </div>
);

export default Layout;