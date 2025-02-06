import React, { useEffect, useState } from "react";
import { useFavoritesStore } from "../store/favoriteStore.ts";
import DogCard from "../components/DogCard.tsx";
import Pagination from "../components/Pagination.tsx";

const FavoritesPage = () => {
    const { favoriteIds, favoriteDogs, fetchFavoriteDogs, clearFavorites } = useFavoritesStore();
    const [page, setPage] = useState(0);
    const [dogsPerPage] = useState(10);


    useEffect(() => {
        fetchFavoriteDogs(page, dogsPerPage);
    }, [page, fetchFavoriteDogs, dogsPerPage]);

    const handleClearFavorites = () => {
        clearFavorites();
        setPage(0);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Your Favorite Dogs</h1>

                {favoriteDogs.length === 0 ? (
                    <p className="text-lg text-center text-gray-600">No favorites added yet.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                            {favoriteDogs.map((dog) => (
                                <DogCard
                                    key={dog.id}
                                    id={dog.id}
                                    img={dog.img}
                                    name={dog.name}
                                    age={dog.age}
                                    zip_code={dog.zip_code}
                                    breed={dog.breed}
                                    isFavorited={favoriteIds.includes(dog.id) && true}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleClearFavorites}
                            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 mb-6 mx-auto block"
                        >
                            Clear Favorites
                        </button>
                    </>
                )}

                <Pagination
                    total={favoriteDogs.length}
                    size={dogsPerPage}
                    currentPage={page}
                    onPageChange={(newPage) => setPage(newPage)}
                />
            </div>
        </div>
    );
};

export default FavoritesPage;
