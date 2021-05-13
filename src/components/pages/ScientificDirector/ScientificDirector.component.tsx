import React, { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import { Sidebar } from 'components/organisms/Sidebar/Sidebar.component';
import { Topbar } from 'components/organisms/Topbar/Topbar.component';
import { API_PATH } from 'constants/index';

export const ScientificDirector: FunctionComponent = () => {
  const [students, setStudents] = useState([
    {
      id: -1,
      userData: { firstName: '', lastName: '', email: '' },
      year: 0,
    },
  ]);

  useEffect(() => {
    axios
      .get(`${API_PATH}/scientific-directors/me/phd-students`, {
        headers: { Authorization: window.localStorage.getItem('token') },
      })
      .then(({ data }) => {
        setStudents(data);
      });
  }, []);

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar />
          <div className="container-fluid">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h4 className="m-0 font-weight-bold text-primary">
                  Список ваших аспірантів
                </h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div
                    id="dataTable_wrapper"
                    className="dataTables_wrapper dt-bootstrap4"
                  >
                    <div className="row">
                      <div className="col-sm-12">
                        <table
                          className="table table-bordered dataTable"
                          id="dataTable"
                          width="100%"
                          cellSpacing="0"
                          role="grid"
                          aria-describedby="dataTable_info"
                          style={{ width: '100%' }}
                        >
                          <thead>
                            <tr role="row">
                              <th
                                className="sorting_asc"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-sort="ascending"
                                aria-label="Name: activate to sort column descending"
                                style={{ width: 306.892 }}
                              >
                                Прізвище та ім&lsquo;я
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Position: activate to sort column ascending"
                                style={{ width: 488.003 }}
                              >
                                Електронна пошта
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="dataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Office: activate to sort column ascending"
                                style={{ width: 229.115 }}
                              >
                                Рік
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {students.map((student) => (
                              <tr key={student.id} role="row" className="odd">
                                <td className="sorting_1">
                                  <a
                                    href={`/scientific-director/phd-student/${student.id}`}
                                  >
                                    {student.userData.lastName}{' '}
                                    {student.userData.firstName}
                                  </a>
                                </td>
                                <td>{student.userData.email}</td>
                                <td>{student.year}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
