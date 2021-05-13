import React, { FunctionComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login/Login.component';
import { PhdStudent } from './pages/PhdStudent/PhdStudent.component';
import { PhdStudentPlanApproving } from './pages/PhdStudentPlanApproving/PhdStudentPlanApproving.component';
import { Profile } from './pages/Profile/Profile.component';
import { ScientificDirector } from './pages/ScientificDirector/ScientificDirector.component';

export const App: FunctionComponent = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/phd-student" component={PhdStudent} />
          <Route
            path="/scientific-director"
            exact
            component={ScientificDirector}
          />
          <Route
            path="/scientific-director/phd-student"
            component={PhdStudentPlanApproving}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
};
