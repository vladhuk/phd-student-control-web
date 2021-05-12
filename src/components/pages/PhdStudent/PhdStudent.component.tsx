import axios from 'axios';
import { Sidebar } from 'components/organisms/Sidebar/Sidebar.component';
import { Topbar } from 'components/organisms/Topbar/Topbar.component';
import { API_PATH } from 'constants/index';
import React, { FunctionComponent, useEffect, useState } from 'react';
import FileDownload from 'js-file-download';

export const PhdStudent: FunctionComponent = () => {
  const [student, setStudent] = useState({
    year: 0,
    scientificDirector: { userData: { firstName: '', lastName: '' } },
  });
  const [plan, setPlan] = useState({
    tasks: [{ id: -1, name: '', isCompleted: false, attachmentName: '' }],
  });

  useEffect(() => {
    axios
      .get(`${API_PATH}/phd-students/me`, {
        headers: { Authorization: window.localStorage.getItem('token') },
      })
      .then(({ data }) => {
        setStudent(data);
      });

    axios
      .get(`${API_PATH}/phd-students/me/plan`, {
        headers: { Authorization: window.localStorage.getItem('token') },
      })
      .then(({ data }) => {
        setPlan(data);
      });
  }, []);

  const uploadFile = (taskId: number) => {
    const formData = new FormData();

    const form = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'file';
    input.id = 'file';
    input.name = 'file';
    form.appendChild(input);

    input.onchange = () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      formData.append('file', input!.files![0]);

      axios
        .post(
          `${API_PATH}/phd-students/me/plan/tasks/${taskId}/attachment`,
          formData,
          {
            headers: {
              Authorization: window.localStorage.getItem('token'),
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then(() => {
          window.location.reload();
        });
    };

    input.click();
  };

  const downloadFile = (taskId: number, fileName: string) => {
    axios
      .get(`${API_PATH}/phd-students/me/plan/tasks/${taskId}/attachment`, {
        headers: { Authorization: window.localStorage.getItem('token') },
        responseType: 'blob',
      })
      .then((res) => {
        FileDownload(res.data, fileName);
      });
  };

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
                {student.scientificDirector.userData.firstName}{' '}
                {student.scientificDirector.userData.lastName}
              </div>
            </div>

            <div className="row mt-5">
              <h2 className="mb-0 text-gray-800">Індивідуальний план</h2>
            </div>
            <hr />
            <div className="col mt-4">
              {plan.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`card ${
                    task.isCompleted
                      ? 'border-left-success'
                      : 'border-left-warning'
                  } shadow h-100 py-2 mt-2 w-50`}
                >
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col mr-2">
                        <div className="h6 font-weight-bold text-primary text-uppercase mb-1">
                          {task.name}
                        </div>
                        {task.attachmentName && (
                          <div className="row ml-3 mt-2 align-items-center">
                            <button
                              type="button"
                              className="btn btn-secondary btn-circle"
                              onClick={() =>
                                downloadFile(task.id, task.attachmentName)
                              }
                            >
                              <i className="fas fa-file" />
                            </button>
                            <div className="font-weight-bold text-gray-800 w-75">
                              {task.attachmentName}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-primary btn-icon-split btn-sm"
                          onClick={() => uploadFile(task.id)}
                        >
                          <span className="icon text-white-50">
                            <i className="fas fa-arrow-right" />
                          </span>
                          <span className="text">Завантажити файл</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
