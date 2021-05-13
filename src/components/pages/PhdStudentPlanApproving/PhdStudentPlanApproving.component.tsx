import axios from 'axios';
import { Sidebar } from 'components/organisms/Sidebar/Sidebar.component';
import { Topbar } from 'components/organisms/Topbar/Topbar.component';
import { API_PATH } from 'constants/index';
import React, { FunctionComponent, useEffect, useState } from 'react';
import FileDownload from 'js-file-download';

export const PhdStudentPlanApproving: FunctionComponent = () => {
  const [plan, setPlan] = useState({
    tasks: [{ id: -1, name: '', isCompleted: false, attachmentName: '' }],
  });

  const hrefParts = window.location.href.split('/');
  const studentId = +hrefParts[hrefParts.length - 1];

  useEffect(() => {
    axios
      .get(
        `${API_PATH}/scientific-directors/me/phd-students/${studentId}/plan`,
        {
          headers: { Authorization: window.localStorage.getItem('token') },
        }
      )
      .then(({ data }) => {
        setPlan(data);
      });
  }, [studentId]);

  const approveTask = (taskId: number) => {
    axios
      .post(
        `${API_PATH}/scientific-directors/me/phd-students/${studentId}/plan/tasks/${taskId}/approve`,
        {},
        {
          headers: { Authorization: window.localStorage.getItem('token') },
        }
      )
      .then(() => {
        window.location.reload();
      });
  };

  const downloadFile = (taskId: number, fileName: string) => {
    axios
      .get(
        `${API_PATH}/scientific-directors/me/phd-students/${studentId}/plan/tasks/${taskId}/attachment`,
        {
          headers: { Authorization: window.localStorage.getItem('token') },
          responseType: 'blob',
        }
      )
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
                      {!task.isCompleted && (
                        <div className="col-auto">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => approveTask(task.id)}
                          >
                            <span className="text">Підтвердити виконання</span>
                          </button>
                        </div>
                      )}
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
