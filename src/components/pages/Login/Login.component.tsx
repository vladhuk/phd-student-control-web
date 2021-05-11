import axios from 'axios';
import { API_PATH } from 'constants/index';
import React, { FunctionComponent, useState } from 'react';

export const Login: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    const { data } = await axios.post(`${API_PATH}/auth/login`, {
      email,
      password,
    });
    window.localStorage.setItem('token', `Bearer ${data.authToken}`);
    window.location.href = '/profile';
  };

  return (
    <div className="kpi-bg">
      <div className="container h-100">
        {/* <!-- Outer Row --> */}
        <div className="row justify-content-center h-100">
          <div className="col-md-6 h-100">
            <div className="card o-hidden border-0 shadow-lg mt-5">
              <div className="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Вітаємо!</h1>
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          placeholder="Електронна пошта..."
                          onChange={(event) => setEmail(event.target.value)}
                          value={email}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          placeholder="Пароль"
                          onChange={(event) => setPassword(event.target.value)}
                          value={password}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary btn-user btn-block"
                        onClick={signIn}
                      >
                        Увійти
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="/login">
                        Створити аккаунт
                      </a>
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
