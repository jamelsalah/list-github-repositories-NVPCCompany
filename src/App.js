import React from 'react'
import SearchInput from './components/SearchInput';
import CheckBox from './components/CheckBox';

import './App.css';

function App() {
  const [data, setData] = React.useState([])
  const [sortedData, setSortedData] = React.useState([])

  const [text, setText] = React.useState('')
  const [radioValue, setRadioValue] = React.useState("alphabetic");
  const [filterBy, setFilterBy] = React.useState('')

  function changeText(str) {
    setText(str);
    handleChange()
  }

  function changeRadio() {
    let radio = '';
    if (radioValue === "alphabetic") {
      radio = "last commit";
    }else if (radioValue === "last commit") {
      radio = "alphabetic"
    }

    setRadioValue(radio)
    handleChange(radio)
  }

  function changeFilter(filterBy) {

    handleChange()
  }

  function handleSearchInput() {
    if (text) {
      const sortedRepositories = data
        .filter((repo) => repo.name.toLowerCase().includes(text.toLowerCase()))
      setSortedData(sortedRepositories)
    } else {
      setSortedData(data)
    }
  }

  function handleRadioValue(radioValue) {
    let result = [];

    if (radioValue === "alphabetic") {
      result = sortedData.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (radioValue === "last commit") {
      result = sortedData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    }
    if (result.lenght > 0) setSortedData(result);
  }

  function filter() {

    return
  }

  function handleChange(radioValue) {
    handleSearchInput()
    handleRadioValue(radioValue)
    filter()
  }

  React.useEffect(() => {
    function getData() {
      fetch(`https://api.github.com/users/jamelsalah/repos`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setSortedData(data);
          console.log('data:', data)
        })
    }
    getData();
  }, [])

  return (
    <div className="App">
      <h1>GitHub Repositories Jamel</h1>

      <SearchInput
        placeHolder="Search by Text..."
        onChange={(str) => changeText(str)}
      />

      <div>
        <div className="check-boxes">
          <h3>Exibir:</h3>
          <CheckBox label="public" />
          <CheckBox label="arquivados" />
          <CheckBox label="last year" />
        </div>

        <div className="check-boxes">
          <h3>Ordenar por:</h3>
          <CheckBox label="alphabetic" type="radio" checked={radioValue === "alphabetic"} onChange={changeRadio} />
          <CheckBox label="last commit" type="radio" checked={radioValue === "last commit"} onChange={changeRadio} />
        </div>
      </div>

      <div className="repositories-list">
        {sortedData && (
          <ul>
            {sortedData.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url}>
                  {repo.name}
                  <div>
                    <span>{repo.private ? "private" : "public"}</span>
                    <span>last commit: {repo.updated_at}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
