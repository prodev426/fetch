/* pages/MatchPage.tsx */
import React, { useEffect, useState } from "react";

const MatchPage = () => {
  const [matchedDog, setMatchedDog] = useState(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
          method: "POST",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setMatchedDog(data.match);
        }
      } catch (error) {
        console.error("Error fetching match:", error);
      }
    };

    fetchMatch();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold mb-4">Your Best Match</h1>
      {matchedDog ? (
        <div className="border rounded-lg p-4 shadow-md flex flex-col items-center">
          <img src={matchedDog.img} alt={matchedDog.name} className="w-32 h-32 object-cover rounded-md" />
          <h2 className="text-lg font-semibold mt-2">{matchedDog.name}</h2>
          <p className="text-gray-600">Age: {matchedDog.age}</p>
          <p className="text-gray-600">Breed: {matchedDog.breed}</p>
        </div>
      ) : (
        <p>Finding your match...</p>
      )}
    </div>
  );
};

export default MatchPage;
