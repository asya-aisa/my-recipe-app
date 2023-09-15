import { useEffect, useState } from 'react';
import './App.css';
import video from './food.mp4'
import MyRecipesComponent from './MyRecipesComponent';
import Buttons from './Buttons';
import Filters from './Filters';
import { FilterList } from './FilterList';

function App() {
  const MY_ID = '023cab42';
  const MY_KEY = 'd7ab44df7049cb746a7bbab914ab8a06';

  const [mySearch, setMySearch] = useState('');
  const [myRecipes, setMyRecipes] = useState([]);
  const [word, setWord] = useState('mango');

  const [newDishes, setNewDishes] = useState([]);

  const [mainArray, setMainArray] = useState([]);
  const [nothingShow, setNothingShow] = useState(false)

  const [arrayChecked, setArrayChecked] = useState([]);

  const [filteredArray, setFilteredArray] = useState([])

  const [filters, setFilters] = useState(FilterList);

  const [myLink, setMyLink] = useState(`https://api.edamam.com/api/recipes/v2?type=public&q=${word}&app_id=${MY_ID}&app_key=${MY_KEY}`)

  const [nextPage, setNextPage] = useState('')

  const showNextPage = () => {
    setMyLink(nextPage)
    unSelect()
  }

  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetch(myLink);
      const data = await response.json();
      console.log(data)
      setMyRecipes(data.hits);
      setMainArray(data.hits)

      setNextPage(data._links.next.href)
      

      // const responseTwo = await fetch(data._links.next.href);
      // const dataTwo = await responseTwo.json();
      // console.log(dataTwo)
    }
    getRecipe()
  }, [word, myLink])

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWord(mySearch);
    setMyLink(`https://api.edamam.com/api/recipes/v2?type=public&q=${word}&app_id=${MY_ID}&app_key=${MY_KEY}`)
  }

  const allDishes = () => {
    setMyRecipes(mainArray);
    setFilteredArray([])
    setArrayChecked([])
    setNothingShow(false)
    unSelect()
  };

  const unSelect = () => {
    setFilters(filters.map(filter => ({...filter, checked: false})))
  }



  return (
    <div className="App">
      <div className='container'>
        <video autoPlay muted loop>
          <source src={video} type='video/mp4' />
        </video>
        <h1>Find a Recipe</h1>
      </div>

      <div className='container'>
        <form onSubmit={finalSearch}>
          <input className='search' onChange={myRecipeSearch} value={mySearch} />
        </form>
      </div>

      <div className='container'>
        <button>
          <img src='https://img.icons8.com/?size=512&id=114896&format=png' alt='icon' className='img-btn' />
        </button>
      </div>
      
      <Buttons myRecipes={myRecipes} 
      setNewDishes={setNewDishes} 
      newDishes={newDishes} 
      setMyRecipes={setMyRecipes} 
      mainArray={mainArray} 
      allDishes={allDishes} 
      setNothingShow={setNothingShow} 
      setFilteredArray={setFilteredArray}
      arrayChecked={arrayChecked}
      unSelect={unSelect}
      />

      <Filters filteredArray={filteredArray}
      setMyRecipes={setMyRecipes}
      mainArray={mainArray}
      setNothingShow={setNothingShow}
      arrayChecked={arrayChecked}
      setArrayChecked={setArrayChecked}
      filters={filters}
      setFilters={setFilters} />

      <div className='container'>
        <h2 className={nothingShow ? 'show' : 'none'}>Oops, nothing found...</h2>
      </div>
      

      {myRecipes.map((element, index) => (
        <MyRecipesComponent key={index}
        label={element.recipe.label}
        image={element.recipe.image}
        ingredients={element.recipe.ingredientLines}
        calories={element.recipe.calories}
        healthLabels={element.recipe.healthLabels} />
      ))}
      <div className='container'>
        <button onClick={showNextPage} className='btn'>Next Page</button>
      </div>

      
            
    </div>
  );
}

export default App;
