import { Sidebar } from 'components/organisms/Sidebar/Sidebar.component';
import { Topbar } from 'components/organisms/Topbar/Topbar.component';
import React, { FunctionComponent } from 'react';

export const PhdStudent: FunctionComponent = () => {
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar />
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">
                Індивідуальний план аспіранта
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
