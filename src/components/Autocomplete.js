import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Autocomplete.css';

const Autocomplete = ({ countries, search }) => {
  /*
    States:
    - activeOption: active option's index
    - matchedOptions: all options that match with the user's input
    - showOptions: decide whether or not option list is shown
    - userInput: value entered by user
  */

  const [activeOption, setActiveOption] = useState(0);
  const [matchedOptions, setMatchedOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState('');

  // Fire event when user enter value
  const onChange = e => {
    const userInput = e.currentTarget.value;
    // Filter out options that match with user input
    const matchedOptions = countries.filter(
      option => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setActiveOption(0);
    setMatchedOptions(matchedOptions);
    setShowOptions(true);
    setUserInput(userInput);
    search(userInput);
  }

  const onBlur = e => {
    setShowOptions(false);
  }

  // Fire event when user click option
  const onClick = e => {
    setActiveOption(0);
    setMatchedOptions([]);
    setShowOptions(false);
    setUserInput(e.currentTarget.innerText);
  }

  const onKeyDown = e => {
    // Fire event when user press Enter key
    if (e.keyCode === 13) {
      setActiveOption(0);
      setShowOptions(false);
      setUserInput(matchedOptions[activeOption]);
      search(matchedOptions[activeOption]);
    }
    // Fire event when user press Up arrow
    else if (e.keyCode === 38) {
      e.preventDefault();
      if (activeOption === 0) {
        setActiveOption(matchedOptions.length - 1);
        return;
      }
      setActiveOption(activeOption - 1);
    }
    // Fire event when user press Down arrow
    else if (e.keyCode === 40) {
      e.preventDefault();
      if (activeOption === matchedOptions.length - 1) {
        setActiveOption(0);
        return;
      }
      setActiveOption(activeOption + 1);
    }
  }

  let optionsList;

  if (showOptions && userInput) {
    if (matchedOptions.length) {
      optionsList = (
        <div className="options">
          {matchedOptions.map((option, index) => {
            let className;
            if (index === activeOption) {
              className = "option-active";
            }
            return (
              <div
                className={className}
                key={option}
                onClick={e => { onClick(e); search(option) }}
                onBlur={e => onBlur(e)}
                onKeyDown={e => { onClick(e); search(option) }}
              >
                {option}
              </div>
            );
          })}
        </div>
      );
    }
  }

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search by country"
        value={userInput}
        onChange={e => onChange(e)}
        onKeyDown={e => onKeyDown(e)}
      />
      {optionsList}
    </div>
  )
}

Autocomplete.defaultProps = {
  countries: []
}
Autocomplete.propTypes = {
  countries: PropTypes.instanceOf(Array).isRequired
}

export default Autocomplete;
