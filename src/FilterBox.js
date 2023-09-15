const FilterBox = ({isChecked, label, checkHandler, index, onClick, value}) => {
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
export default FilterBox;