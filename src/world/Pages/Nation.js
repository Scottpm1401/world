import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function Nation(props) {
  const { name } = useParams();
  const [nation, setNation] = useState();
  const [borderNation, setBorderNation] = useState([]);

  useEffect(() => {
    async function testFunction() {
      let results = await Axios.get(
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
        <div className="loader_crl">
          <svg
            version="1.1"
            className="loader"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 40 40"
            enable-background="new 0 0 40 40"
          >
            <path
              opacity="0.2"
              fill="#000"
              d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
            ></path>
            <path
              fill="#000"
              d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
            >
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 20 20"
                to="360 20 20"
                dur="0.5s"
                repeatCount="indefinite"
              ></animateTransform>
            </path>
          </svg>
        </div>
      )}
    </div>
  );
}

export default Nation;
