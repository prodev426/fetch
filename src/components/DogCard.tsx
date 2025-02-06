import { useFavoritesStore } from "../store/favoriteStore.ts";
import React from "react";

type DogCardProps = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
  isFavorited: boolean;
};

const DogCard: React.FC<DogCardProps> = ({
  id,
  img,
  name,
  age,
  zip_code,
  breed,
  isFavorited,
}) => {
  const { addFavorite, removeFavorite } = useFavoritesStore();

  const handleFavorite = () => {
    if (isFavorited) {
      removeFavorite(id, img, name, age, zip_code, breed);
    } else {
      addFavorite(id, img, name, age, zip_code, breed);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col items-center">
      <img src={img} alt={name} className="w-32 h-32 object-cover rounded-md" />
      <h2 className="text-lg font-semibold mt-2">{name}</h2>
      <p className="text-gray-600">Age: {age}</p>
      <p className="text-gray-600">Breed: {breed}</p>
      <p className="text-gray-600">ZIP Code: {zip_code}</p>
      <button
        onClick={handleFavorite}
        className={`mt-2 px-4 py-1 rounded-md text-white ${isFavorited ? "bg-red-500" : "bg-blue-500"}`}
      >
        {isFavorited ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
};

export default DogCard;
