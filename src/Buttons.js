function Buttons({setMyRecipes, mainArray, allDishes, setNothingShow, setFilteredArray, healthfilteredarray, arrayChecked, unSelect}) {
  
  const chosenDish = (dishType) => {
    unSelect();
    let dishes = [];
    
    mainArray.forEach(item => {
      if(item.recipe.dishType) {
        item.recipe.dishType.forEach(elem => {
          if(elem === dishType) {
            dishes.push(item);
            setMyRecipes(dishes)
            setFilteredArray(dishes)
            setNothingShow(false)
          }
          else if(dishes.length < 1) {
            setMyRecipes([])
            setNothingShow(true)
          }
        })
      }
    })
  }
  

  const filtrSmoothies = (word) => {
    let smoothiesArray = [];

    mainArray.forEach(item => {
      let label = item.recipe.label.toLowerCase();

      if(label.includes(word)) {
        smoothiesArray.push(item)
        setMyRecipes(smoothiesArray)
        setFilteredArray(smoothiesArray)
        setNothingShow(false)
      }
      else if(smoothiesArray.length < 1) {
        setMyRecipes([])
        setNothingShow(true)
      }
    })
  }

  return(<div>
    <div className="container">
      <button className="btn" onClick={() => chosenDish('salad')}>Salad</button>
      <button className="btn" onClick={() => chosenDish('soup')}>Soup</button>
      <button className="btn" onClick={() => chosenDish('main course')}>Main Course</button>
      <button className="btn" onClick={() => filtrSmoothies('smoothie')}>Smoothies</button>
      <button className="btn" onClick={() => allDishes()}>SHOW ALL</button>
    </div>
  </div>)
}
export default Buttons;