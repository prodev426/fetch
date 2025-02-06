import React from "react";
import { useFavoritesStore } from "../store/favoritesStore";

export default function Match() {
  const { favorites } = useFavoritesStore();

  const findMatch = async () => {
    const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(favorites),
    });
    const match = await response.json();
    alert(`Your match is: ${match.match}`);
  };

  return (
    <button onClick={findMatch} className="bg-green-500 text-white p-2 rounded">
      Find Match
    </button>
  );
}
