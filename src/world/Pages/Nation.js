import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Loading from "../../components/Loading";

function Nation(props) {
  const { name } = useParams();
  const [nation, setNation] = useState();
  const [borderNation, setBorderNation] = useState([]);

  useEffect(() => {
    async function testFunction() {
      const results = await Axios.get(
        `https://restcountries.eu/rest/v2/name/${name}`
      );

      const newBorder = [];

      for (var i of results.data[0].borders) {
        let borderList = await Axios.get(
          `https://restcountries.eu/rest/v2/alpha/${i.toLowerCase()}`
        );
        let sliceString = borderList.data.name.indexOf("(");
        sliceString === -1
          ? newBorder.push(borderList.data.name)
          : newBorder.push(borderList.data.name.slice(0, sliceString));
      }
      setNation(results.data[0]);
      setBorderNation(newBorder.slice(0, 3));
    }

    testFunction();
  }, [name]);

  return (
    <div className="container">
      <div className="btn_crl">
        <Link className="btn back_btn" to="/">
          {props.Theme === "dark" ? (
            <ArrowBackIcon style={{ color: "#858585" }} />
          ) : (
            <ArrowBackIcon style={{ color: "#111517" }} />
          )}

          <span className="back_text">Back</span>
        </Link>
      </div>
      {nation ? (
        <article className="nation">
          <img className="nation_flag" src={nation.flag} alt={nation.name} />
          <div className="nation_content">
            <h2 className="nation_name">{nation.name}</h2>
            <div className="nation_info">
              <div className="nation_info1">
                <p>
                  <span>Native Name: </span>
                  {nation.nativeName}
                </p>
                <p>
                  <span>Population: </span>
                  {nation.population}
                </p>
                <p>
                  <span>Region: </span>
                  {nation.region}
                </p>

                <p>
                  <span>Sub Region: </span>
                  {nation.subregion}
                </p>
                <p>
                  <span>Capital: </span>
                  {nation.capital}
                </p>
              </div>
              <div className="nation_info2">
                <p>
                  <span>Top Level Domain: </span>
                  {nation.topLevelDomain[0]}
                  <p>
                    <span>Currencies: </span>
                    {nation.currencies[0].code}
                  </p>
                  <p>
                    <span>Languages: </span>
                    {nation.languages[0].name}
                  </p>
                </p>
              </div>
            </div>
            <div className="nation_border">
              <span>Border Countries: </span>
              {borderNation.map((bdnation) => {
                return (
                  <Link
                    to={(location) => ({
                      ...location,
                      pathname: `/nation/${bdnation}`,
                    })}
                    key={bdnation}
                    className="btn border_btn"
                  >
                    {bdnation}
                  </Link>
                );
              })}
            </div>
          </div>
        </article>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Nation;
