import React, { ReactNode } from 'react';

import './Layout.scss';

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => (
    <div className="Layout">
        {children}
    </div>
);

export default Layout;