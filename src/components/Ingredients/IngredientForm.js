import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from "../UI/LoadingIndicator";

const IngredientForm = React.memo(props => {
  const [currentState, updateState] = useState({title: '', amount: ''}); // or register multiple state, which is better than solo state
  const submitHandler = event => {
    props.onIngredientChange(currentState);
    event.preventDefault();
    // ...
  };

  const onTitleChange = ({target})=> updateState( (preState) => {
    // simulate id, as it should come from backend.
    return {...preState, title: target.value};
  });

  const onAmountChange = ({target})=> updateState((preState) => {
    return {...preState, amount: target.value};
  });

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={currentState.title} onChange={onTitleChange} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={currentState.amount} onChange={onAmountChange}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator/>}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
