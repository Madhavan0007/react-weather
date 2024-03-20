import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate"
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(
                `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
                geoApiOptions
            );
    
            const responseData = await response.json();
    
            const options = responseData.data.map((city) => ({
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name}, ${city.countryCode}`,
            }));
    
            return { options };
        } catch (error) {
            console.error(error);
            return { options: [] }; // Return empty options array in case of error
        }
    };
    

    return (
    <AsyncPaginate 
        placeholder="Search for city"
        debounceTimeout = {600}
        value={search}  
        onChange={handleOnChange}  
        loadOptions={loadOptions}  
    />
  );
}

export default Search;