import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [userInput, setUserInput] =  useState('');
  const {onIngredientsLoaded} = props;
  const inputRef = useRef();

    useEffect(() => {
      const timer =  setTimeout(() => {
            if (userInput === inputRef.current.value) {
                const query = userInput.length > 0 ? `?orderBy="title"&equalTo="${userInput}"` : '';
                fetch('https://react-hooks-tutorial-52656.firebaseio.com/ingredients.json' + query
                ).then((response => response.json())).then((ingredients) => {
                    if (ingredients) {
                        const fetchedIngredients = [];
                        for(const key in  ingredients) {
                            fetchedIngredients.push({
                                id: key,
                                ...ingredients[key]
                            })
                        }
                        onIngredientsLoaded(fetchedIngredients);
                    }
                });
            }
        }, 500)

        return () => {
          clearTimeout(timer);
        }
    },[userInput, onIngredientsLoaded, inputRef]);


  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={userInput} onChange={({target}) => setUserInput(target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
