import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Autocomplete.css';

const Autocomplete = ({ data }) => {
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
    const matchedOptions = data.filter(
      option => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setActiveOption(0);
    setMatchedOptions(matchedOptions);
    setShowOptions(true);
    setUserInput(e.currentTarget.value);
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
      setMatchedOptions(false);
      setUserInput(matchedOptions[activeOption]);
    }
    // Fire event when user press Up arrow
    else if (e.keyCode === 38) {
      if (activeOption === 0) {
        setActiveOption(matchedOptions.length - 1);
      }
      setActiveOption(activeOption - 1);
    }
    // Fire event when user press Down arrow
    else if (e.keyCode === 40) {
      if (activeOption - 1 === matchedOptions.length) {
        setActiveOption(0);
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
            return (
              <div
                className="option-active"
                key={option}
                onClick={onClick}
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
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {optionsList}
    </div>
  )
}

Autocomplete.defaultProps = {
  data: []
}
Autocomplete.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired
}

export default Autocomplete;
