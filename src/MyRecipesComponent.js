function MyRecipesComponent({label, image, ingredients, calories, healthLabels}) {
    return(<div>
        <div className="container">
            <h2>{label}</h2>
        </div>
        <div className="container">
            <p className="p-calories">{calories.toFixed()} calories</p>
        </div>
        <div className="container">
            <img src={image} alt="dish" className="img-dish" />
            
            
            <ul className="list">
                <h4>Ingredients:</h4>
                {ingredients.map((elem, index) => (
                    <li key={index}>{elem}</li>
                ))}
            </ul>
        </div>

       

        <div className="container">
            <div className="cont">
                <h4>Health Labels:</h4>
                <p className="p-healthLabels">{healthLabels.join(', ') + '.'}</p>
            </div>
        </div>
    </div>)
}

export default MyRecipesComponent;