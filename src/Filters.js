export const FilterBox = ({isChecked, label, checkHandler, index, onClick, value}) => {
    return(<div>
        <input
        type="checkbox"
        id={`checkbox-${index}`}
        checked={isChecked}
        onChange={checkHandler}
        onClick={onClick}
        value={value}
        />
        <label htmlFor={`checkbox-${index}`}>{label}</label>
    </div>)
}

function Filters({filteredArray, setMyRecipes, mainArray, setNothingShow, arrayChecked, setArrayChecked, filters, setFilters }) {

    const isChecked = (arr, val) => {
        return arr.some(function (arrVal) {
            return val === arrVal;
        })
    }

    const isIncludes = (a, b) => b.every((element) => a.includes(element));

    const addItem = (e) => {
        const value = e.target.value;
        
        if (isChecked(arrayChecked, value)) {
            setArrayChecked(arrayChecked.filter(item => item !== value))
        } else {
            setArrayChecked(arrayChecked => ([...arrayChecked, value]))
        }
    }

    const updateCheckStatus = index => {
        setFilters(
            filters.map((filter, currentIndex) =>
            currentIndex === index
            ? {...filter, checked: !filter.checked}
            : filter
            )
        )
    }

    const filterDishes = (e) => {
        e.preventDefault();
        let filterResult = [];

        if(filteredArray.length > 0) {
            filteredArray.forEach(element => {
                let healthLabels = element.recipe.healthLabels;
    
                if(isIncludes(healthLabels, arrayChecked)) {
                    filterResult.push(element);
                    setMyRecipes(filterResult);
                    setNothingShow(false)               
                }
                else if(filterResult.length < 1) {
                    setMyRecipes([])
                    setNothingShow(true)
                }
            });
        }
         else {
            mainArray.forEach(element => {
                let healthLabels = element.recipe.healthLabels;
    
                if(isIncludes(healthLabels, arrayChecked)) {
                    filterResult.push(element);
                    setMyRecipes(filterResult);
                    setNothingShow(false)               
                }
                else if(filterResult.length < 1) {
                    setMyRecipes([])
                    setNothingShow(true)
                }
            });
         }
    }

    return(<div className="container">
        <form>
            {filters.map((filter, index) => (
                <FilterBox
                key={filter.name}
                isChecked={filter.checked}
                checkHandler={() => updateCheckStatus(index)}
                label={filter.name}
                index={index}
                value={filter.name}
                onClick={addItem}
                />
            ))}

        <button onClick={filterDishes} className="btn">Show Results</button>
        </form>
    </div>)
}

export default Filters;