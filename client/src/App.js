import { Switch, Route, Redirect } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList";
import Employee from "./pages/Employee";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/employees" />} />
        <Route path="/employees" component={EmployeeList} />
        <Route path="/employee/:id" component={Employee} />
      </Switch>
    </div>
  );
}

export default App;
