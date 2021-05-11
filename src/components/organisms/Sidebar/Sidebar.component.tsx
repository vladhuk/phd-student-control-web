import React, { FunctionComponent } from 'react';

import logo from 'assets/images/kpi-logo.png';

export const Sidebar: FunctionComponent = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <div className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon">
          <img style={{ width: '4rem' }} src={logo} alt="" />
        </div>
        <div className="sidebar-brand-text mx-3">Аспірантура КПІ</div>
      </div>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-0" />

      <li className="nav-item">
        <a className="nav-link" href="/profile">
          Мій профіль
        </a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="/phd-student">
          Для аспірантів
        </a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="/scientific-director">
          Для керівників
        </a>
      </li>
    </ul>
  );
};
