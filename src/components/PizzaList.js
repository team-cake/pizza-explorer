import React from "react";
import { useSelector } from "react-redux";

const selectUser = reduxState => {
  return reduxState.user;
};

export default function PizzaList() {
  const user = useSelector(selectUser);

  return (
    <div>
      <h1>Pizza Explorer</h1>
      <p>
        Welcome back, <strong>{user.name}</strong>! Your favorite pizzas:
      </p>
      <p>TODO: the list of pizzas</p>
    </div>
  );
}