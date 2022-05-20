import React, { lazy, Suspense } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import log from "../components/helper/logger";
// import { Container } from "reactstrap";
// import classNames from "classnames";
import PrivateRoute from "./PrivateRoute";
// import Topbar from "../components/common/Topbar";

const Dashboard = lazy(() =>
  import("../components/modules/Dashboard/Dashboard")
);
const Login = lazy(() => import("../components/modules/Auth/Login"));
const ForgotPassword = lazy(() =>
  import("../components/modules/Auth/ForgotPassword")
);
const NotFound = lazy(() => import("../components/modules/NotFound/NotFound"));
const PostTypes = lazy(() =>
  import("../components/modules/PostTypes/PostTypes")
);
const Tags = lazy(() => import("../components/modules/Tags/Tags"));
const ContentLibrary = lazy(() =>
  import("../components/modules/ContentLibrary/ContentLibrary")
);
const SchedulePost = lazy(() =>
  import("../components/modules/SchedulePost/SchedulePost")
);
const SchedulePostForm = lazy(() =>
  import("../components/modules/SchedulePost/SchedulePostForm")
);
const SavedPost = lazy(() =>
  import("../components/modules/SavedPost/SavedPost")
);
const Calendar = lazy(() =>
  import("../components/modules/BigCalendar/BigCalendar")
);
const EngagementSettings = lazy(() =>
  import("../components/modules/EngagementSettings/EngagementSettings")
);
const FacebookLinks = lazy(() =>
  import("../components/modules/FacebookLinks/FacebookLinks")
);
const Settings = lazy(() => import("../components/modules/Settings/Settings"));

const AppRoute = ({ sidebarIsOpen, toggleSidebar }) => {
  log.info("**** AppRoute ****");

  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute exact path="/" backend={false} component={Dashboard} />
        <PrivateRoute
          exact
          path="/post-types/"
          backend={false}
          component={PostTypes}
        />
        <PrivateRoute exact path="/tags/" backend={false} component={Tags} />
        <PrivateRoute
          exact
          path="/content-library/"
          backend={false}
          component={ContentLibrary}
        />
        <PrivateRoute
          exact
          path="/schedule-post/"
          backend={false}
          component={SchedulePost}
        />
        <PrivateRoute
          exact
          path="/schedule-a-post/:id?/:type?"
          backend={true}
          component={SchedulePostForm}
        />
        <PrivateRoute
          exact
          path="/saved-post/:name/:id?"
          backend={false}
          component={SavedPost}
        />
        <PrivateRoute
          exact
          path="/calendar/"
          backend={false}
          component={Calendar}
        />
        <PrivateRoute
          exact
          path="/settings/"
          backend={false}
          component={Settings}
        />
        <PrivateRoute
          exact
          path="/engagement-settings/"
          backend={false}
          component={EngagementSettings}
        />
        <PrivateRoute
          exact
          path="/facebook-links/"
          backend={false}
          component={FacebookLinks}
        />
        <Route to="*" component={NotFound} />
      </Switch>
    </Suspense>
  );
};
export default withRouter(AppRoute);
