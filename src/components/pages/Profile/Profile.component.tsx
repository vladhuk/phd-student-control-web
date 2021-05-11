import axios from 'axios';
import { Sidebar } from 'components/organisms/Sidebar/Sidebar.component';
import { Topbar } from 'components/organisms/Topbar/Topbar.component';
import { API_PATH } from 'constants/index';
import React, { FunctionComponent, useEffect, useState } from 'react';

export const Profile: FunctionComponent = () => {
  const [profile, setProfile] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    axios
      .get(`${API_PATH}/users/me`, {
        headers: { Authorization: window.localStorage.getItem('token') },
      })
      .then(({ data }) => {
        setProfile(data);
      });
  }, []);

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar />
          <div className="container-fluid">
            <div className="row">
              <h2 className="mb-0 text-gray-800">Профіль</h2>
            </div>
            <hr />
            <div className="row mt-4">
              <h5>ID:</h5>
              <div>{profile.id}</div>
            </div>
            <div className="row mt-4">
              <h5>Ім&lsquo;я:</h5>
              <div>
                {profile.firstName} {profile.lastName}
              </div>
            </div>
            <div className="row mt-4">
              <h5>Пошта:</h5>
              <div>{profile.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
