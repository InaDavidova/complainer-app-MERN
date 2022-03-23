import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";

function App() {
  return (
    <div className="App">
      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/form" exact component={Form} />
      <Route path="/posts" exact component={Posts} />
      </Switch>
    </div>
  );
}

export default App;
