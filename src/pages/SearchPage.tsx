import React, { useEffect, useState } from "react";
import DogCard from "../components/DogCard.tsx";
import Pagination from "../components/Pagination.tsx";
import { getDogs, getBreeds } from "../api/dogs.ts";
import { useAuthStore } from "../store/authStore.ts";
import { useFavoritesStore } from "../store/favoriteStore.ts";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [page, setPage] = useState(0);
  const { favoriteIds } = useFavoritesStore();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    fetchDogs();
  }, [selectedBreed, page]);

  const fetchDogs = async () => {
    const data: any = await getDogs({ breed: selectedBreed, size: 10, from: page * 10 });
    const dogsData = await getDogsData(data);
    setDogs(dogsData);
  };

  const getDogsData = async (body) => {
    const res = await fetch("https://frontend-take-home-service.fetch.com/dogs", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...body]),
    });

    return await res.json();
  };

  const fetchBreeds = async () => {
    try {
      const data = await getBreeds();
      setBreeds(data);
    } catch (error) {
      console.error("Error fetching breeds:", error);
    }
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    await logout();
    navigate("/");
  };

  const handleFavorite = async () => {
    navigate("/favorites");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex items-center space-x-6 mb-4 sm:mb-0">
            <label htmlFor="breed-select" className="text-lg font-medium text-gray-700">Select Breed:</label>
            <select
              id="breed-select"
              className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setSelectedBreed(e.target.value);
                setPage(0);
              }}
            >
              <option value="">All Breeds</option>
              {breeds.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 w-full sm:w-auto">
            <button
              onClick={handleFavorite}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mb-4 sm:mb-0"
            >
              View Favorites
            </button>
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        {dogs.length === 0 ? (
          <p className="text-center text-gray-600">No dogs found matching your criteria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {dogs.map((dog) => (
              <DogCard
                key={dog.id}
                id={dog.id}
                img={dog.img}
                name={dog.name}
                age={dog.age}
                zip_code={dog.zip_code}
                breed={dog.breed}
                isFavorited={favoriteIds.includes(dog.id)}
              />
            ))}
          </div>
        )}

        <Pagination
          total={100}
          size={10}
          currentPage={page}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default SearchPage;
