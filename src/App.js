import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import { NavBar } from './components/layout/NavBar/NavBar';
import { HomePage } from './components/pages/HomePage/HomePage';
import { AboutPage } from './components/pages/AboutPage/AboutPage';
import { GeneralOverviewPage } from './components/pages/GeneralOverviewPage/GeneralOverviewPage';
import { Footer } from './components/layout/Footer/Footer';
import { LocalDataPage } from './components/pages/LocalDataPage/LocalDataPage';
import { DataByCountryPage } from './components/pages/DataByCountryPage/DataByCountryPage';

// Custom hooks
import { useWindowSize } from './hooks/useWindowSize';
import { useWorldMap } from './hooks/useWorldMap';
// import { useWeeklyData } from "./hooks/useWeeklyData";
import { useDailyData } from "./hooks/useDailyData";
import { useLocalData } from "./hooks/useLocalData";

/*
Central component of the application, contains the general structure of the application
- navbar
- all the loadable pages on its corresponding route
- footer
Surrounder by the Router component to allow navigation
*/

function App() {
  
  // Hook responsible for detecting window resizes
  const windowWidth = useWindowSize();
  
  //When fetched dailydata consists of [deaths, cases, recovered] in the specified order
  const dailyData = useDailyData();

  // Hook to load the data from open data euskadi // still unused
  const localData = useLocalData();

  // Hook to load the data to represent world map
  const worldMap = useWorldMap();
  
  return (
    <Router>
      <NavBar />
      <div className="container-fluid">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/overview">
            <GeneralOverviewPage data={dailyData} width={windowWidth} />
          </Route>
          <Route path="/country">
            <DataByCountryPage worldMap={worldMap} data={dailyData} width={windowWidth} />
          </Route>
          <Route path="/local">
            <LocalDataPage data={localData} width={windowWidth} />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
