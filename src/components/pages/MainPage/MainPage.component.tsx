import { Sidebar } from 'components/organisms/Sidebar/Sidebar.component';
import { Topbar } from 'components/organisms/Topbar/Topbar.component';
import React, { FunctionComponent } from 'react';

export const MainPage: FunctionComponent = () => {
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar />
          <div className="container-fluid">{/* TODO: */}</div>
        </div>
      </div>
    </div>
  );
};
