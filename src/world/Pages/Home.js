import React, { useState, useEffect } from "react";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { Link } from "react-router-dom";
import Axios from "axios";
import Loading from "../../components/Loading";

function Home(props) {
  const [nations, setNations] = useState([]);
  const [constNations, setConstNations] = useState([]);

  const handleFilter = (e) => {
    Axios.get(
      `https://restcountries.eu/rest/v2/region/${e.target.value.toLowerCase()}`
    ).then((response) => {
      setNations(response.data);
    });
  };

  useEffect(() => {
    Axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setNations(response.data);
      setConstNations(response.data);
    });
  }, []);

  const handleSearch = (e) => {
    let newNations = [];
    for (var i of constNations) {
      if (i.name.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1) {
        newNations.push(i);
      }
    }
    setNations(newNations);
  };

  return (
    <React.Fragment>
      <div className="top container">
        <div className="search_bar">
          <form className="search_form">
            {props.Theme === "dark" ? (
              <SearchOutlinedIcon style={{ color: "#FFF" }} />
            ) : (
              <SearchOutlinedIcon style={{ color: "#858585" }} />
            )}
            <input
              className="search_content"
              type="text"
              onKeyUp={(e) => handleSearch(e)}
              placeholder="Search for a country..."
            />
          </form>
        </div>
        <select className="select_crl" onChange={(e) => handleFilter(e)}>
          <option value="" disabled selected>
            Filter by Region
          </option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      {nations.length > 0 ? (
        <section className="nations_list container">
          {nations.map((nation) => {
            const { name, population, flag, capital, region } = nation;
            return (
              <Link
                to={`/nation/${name.toLowerCase()}`}
                className="nations"
                key={name}
              >
                <img className="nations_flag" src={flag} alt={name} />
                <div className="nations_content">
                  <h2 className="nations_name">{name}</h2>
                  <p>
                    <span>Population: </span>
                    {population}
                  </p>
                  <p>
                    <span>Region: </span>
                    {region}
                  </p>
                  <p>
                    <span>Capital: </span>
                    {capital}
                  </p>
                </div>
              </Link>
            );
          })}
        </section>
      ) : (
        <Loading />
      )}
    </React.Fragment>
  );
}

export default Home;
