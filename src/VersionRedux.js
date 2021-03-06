import React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { restaurants } from "./data";

const initialState = {
  rating: 3,
  price: 1
};

const actions = {
  SET_RATING: "SET_RATING",
  SET_PRICE: "SET_PRICE",
  RESET: "RESET"
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_RATING:
      return { ...state, rating: action.value };
    case actions.SET_PRICE:
      return { ...state, price: action.value };
    case actions.RESET:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
const store = createStore(reducer);

export default function VersionRedux() {
  return (
    <Provider store={store}>
      <ConnectedFilters />
      <ConnectedResults />
    </Provider>
  );
}

function Filters({ rating, setRating, price, setPrice, reset }) {
  return (
    <div>
      <div>
        {[1, 2, 3, 4, 5].map(num => (
          <button
            key={num}
            onClick={() => {
              setRating(num);
            }}
            className={rating >= num ? "active" : ""}
          >
            <span role="img" aria-label={`${num} star`}>
              ⭐️
            </span>
          </button>
        ))}
      </div>

      <div>
        {[1, 2, 3].map(num => (
          <button
            key={num}
            onClick={() => {
              setPrice(num);
            }}
            className={price >= num ? "active" : ""}
          >
            <span role="img" aria-label={`${num} money bag`}>
              💰
            </span>
          </button>
        ))}
      </div>

      <div>
        <button onClick={reset}>reset</button>
      </div>
    </div>
  );
}

const ConnectedFilters = connect(
  state => {
    return {
      rating: state.rating,
      price: state.price
    };
  },
  dispatch => {
    return {
      setRating: value => dispatch({ type: actions.SET_RATING, value }),
      setPrice: value => dispatch({ type: actions.SET_PRICE, value }),
      reset: () => dispatch({ type: actions.RESET })
    };
  }
)(Filters);

function Results({ rating, price }) {
  const filtered = restaurants.filter(
    restaurant => restaurant.rating >= rating && restaurant.price >= price
  );

  return (
    <ul>
      {filtered.map(restaurant => (
        <li key={restaurant.name}>
          <h2>{restaurant.name}</h2>

          <p>
            {[...Array(restaurant.rating)].map((_, n) => (
              <span role="img" aria-label="star" key={n}>
                ⭐️
              </span>
            ))}
            <br />
            {[...Array(restaurant.price)].map((_, n) => (
              <span role="img" aria-label="money bag" key={n}>
                💰
              </span>
            ))}
          </p>
        </li>
      ))}
    </ul>
  );
}

const ConnectedResults = connect(state => {
  return {
    rating: state.rating,
    price: state.price
  };
})(Results);
