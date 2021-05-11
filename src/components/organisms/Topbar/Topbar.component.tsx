import axios from 'axios';
import { API_PATH } from 'constants/index';
import React, { FunctionComponent, useEffect, useState } from 'react';

import profileImage from 'assets/images/undraw_profile.svg';

export const Topbar: FunctionComponent = () => {
  const [isUserMenuEnabled, setUserMenuEnabled] = useState(false);

  const [name, setName] = useState({ firstName: '', lastName: '' });

  useEffect(() => {
    axios
      .get(`${API_PATH}/users/me`, {
        headers: { Authorization: window.localStorage.getItem('token') },
      })
      .then(({ data }) => {
        setName(data);
      });
  }, []);

  const logout = async () => {
    window.localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow">
          <div
            className="nav-link dropdown-toggle"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {name.firstName} {name.lastName}
            </span>
            <img
              className="img-profile rounded-circle"
              src={profileImage}
              alt=""
              onClick={() => setUserMenuEnabled(!isUserMenuEnabled)}
            />
          </div>
          <button
            type="button"
            className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${
              isUserMenuEnabled ? 'show' : ''
            }`}
          >
            <button type="button" className="dropdown-item" onClick={logout}>
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
              Logout
            </button>
          </button>
        </li>
      </ul>
    </nav>
  );
};
