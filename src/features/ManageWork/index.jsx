import NotFound from "components/NotFound";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import ListWorkSpaces from "./pages/listWorkSpaces";
import TableSpace from "./pages/tableSpace";

function ManageWork(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.path} component={ListWorkSpaces} exact />
        <Route
          path={`${match.path}/:workSpaceID`}
          component={TableSpace}
          exact
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default ManageWork;
