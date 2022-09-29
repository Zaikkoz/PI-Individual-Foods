import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import HomePage from './components/HomePage.jsx';
import AddRecipe from './components/AddRecipe.jsx';
import RecipeDetails from './components/RecipeDetails';
//Terminado al fin

function App() {
  return (
    <BrowserRouter>
    <div className="App">   
      <Switch>
        <Route exact path="/" component={LandingPage}/>      
        <Route path="/home" exact component={HomePage}/>
        <Route path="/recipe" exact component={AddRecipe}/>
        <Route path="/home/:id" component={RecipeDetails}/> 
      </Switch>     
    </div>
    </BrowserRouter>
  );
}

export default App;
