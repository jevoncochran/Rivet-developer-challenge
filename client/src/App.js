import { Switch, Route, Redirect } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/employees" />} />
        <Route exact path="/employees" component={EmployeeList} />
      </Switch>
    </div>
  );
}

export default App;
