import React from "react";
import { useState, useEffect } from "react";
import DogCard from "./DogCard.ts";


export default function Search() {
  const [dogs, setDogs] = useState([]);


  useEffect(() => {
    fetch("https://frontend-take-home-service.fetch.com/dogs/search?size=10&sort=breed:asc", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setDogs(data.resultIds));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Dog Search</h2>
      <div className="grid grid-cols-3 gap-4">
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>
    </div>
  );
}
