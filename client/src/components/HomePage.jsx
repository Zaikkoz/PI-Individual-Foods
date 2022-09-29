import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, dietsFilter, alphabeticalSort, healthScoreSort } from '../redux/action';
import Recipe from './Recipe';
import { Link } from 'react-router-dom'
import Paged from './Paged';
import SearchBar from './SearchBar';
import './home.css'


let prevId = 1;

export default function Home() {
    
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    
    const [order, setOrder] = useState('')
    
    
    const [page, setPage] = useState(1);
    const [recipesPage, setRecipesPage] = useState(9);
    
    const quantityRecipesPage = page * recipesPage;
    const firstRecipePage = quantityRecipesPage - recipesPage;
    const showRecipesPage = allRecipes.slice(firstRecipePage, quantityRecipesPage);
    
    const paged = function(pageNumber) {
        setPage(pageNumber)
    };


    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
        setPage(1);
    }

    function handleDietsFilter(e) {
        e.preventDefault();
        dispatch(dietsFilter(e.target.value))
        setPage(1);
    }

    function handleAlphabeticalSort(e) {
        e.preventDefault();                
        dispatch(alphabeticalSort(e.target.value))
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }
    
    function handleHealthScoreSort(e) {
        e.preventDefault();                
        dispatch(healthScoreSort(e.target.value));
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    }

    return(
        <div className='box'>
        <div className="home">
            <h1 className="initialMsg">Recetas</h1>
            <div>
                <button className="refreshButton" onClick={handleClick}>Refrescar busqueda</button>
                <Link to="/recipe">
                    <button className="addButton">Agregar receta</button>
                </Link>
            </div>
            <div className='recipesSearch'>
            <div className="select">
                <label className="filters">Ordenar:</label>
                <select className="select" name="alphabetical" onChange={e => handleAlphabeticalSort(e)}>
                    <option disabled selected>Alfabetico</option>
                    <option value="atoz">A - Z</option>
                    <option value="ztoa">Z - A</option>
                </select>
                <select className="select" name="numerical" onChange={e => handleHealthScoreSort(e)}>
                    <option disabled selected>Puntaje de comida saludable</option>
                    <option value="asc">De minimo a maximo</option>
                    <option value="desc">De maximo a minimo</option>
                </select>
                <label className="filters">Dietas:</label>
                <select className="select" name="diets" onChange={e => handleDietsFilter(e)}>
                    <option disabled selected>Seleccionar...</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Keto</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto vegetarian">Lacto-Vegetarian</option>
                    <option value="ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescetarian</option>
                    <option value="paleolithic">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="low fodmap">Low FODMAP</option>
                    <option value="whole 30">Whole30</option>
                    <option value="dairy free">Dairy Free</option>
                </select>
            </div>
           
            <SearchBar/>

            <div className="allrecipes">
            {
                showRecipesPage?.map(e => {
                    return (
                        <div className="eachRecipe" key={prevId++}>
                            <Link className="linkRecetas" to={`home/${e.id}`}>
                                <Recipe
                                    image={e.image ? 
                                        e.image :
                                        '../images/imgnotfound.jpg'}
                                    name={e.name}                             
                                    diets={e.diets? e.diets : e.Diets.map(e=>e.name)} />
                            </Link>
                        </div>
                    )
                })
            }
            </div>            
            
            <Paged recipesPage={recipesPage} allRecipes={allRecipes.length} paged={paged}/>

        </div>
        </div>
        </div>

    )
}