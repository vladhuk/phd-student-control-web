import axios from 'axios';
import { Sidebar } from 'components/organisms/Sidebar/Sidebar.component';
import { Topbar } from 'components/organisms/Topbar/Topbar.component';
import { API_PATH } from 'constants/index';
import React, { FunctionComponent, useEffect, useState } from 'react';

export const PhdStudent: FunctionComponent = () => {
  const [student, setStudent] = useState({
    year: 0,
    scientificDirector: { firstName: '', lastName: '' },
  });
  // TODO:
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [plan, setPlan] = useState({ tasks: [] });

  useEffect(() => {
    axios
      .get(`${API_PATH}/phd-student/me`, {
        headers: { Authorization: window.localStorage.getItem('token') },
      })
      .then(({ data }) => {
        setStudent(data);
      });

    axios
      .get(`${API_PATH}/phd-student/me/plan`, {
        headers: { Authorization: window.localStorage.getItem('token') },
      })
      .then(({ data }) => {
        setPlan(data);
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
              <h2 className="mb-0 text-gray-800">Загальна інформація</h2>
            </div>
            <hr />
            <div className="row mt-4">
              <h5>Рік:</h5>
              <div>{student.year}</div>
            </div>
            <div className="row mt-4">
              <h5>Керівник:</h5>
              <div>
                {student.scientificDirector.firstName}{' '}
                {student.scientificDirector.lastName}
              </div>
            </div>
            <hr />

            <div className="row">
              <h2 className="mb-0 text-gray-800">Індивідуальний план</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
