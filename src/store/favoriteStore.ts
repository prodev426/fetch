import { create } from "zustand";

interface FavoritesState {
  favoriteIds: string[];
  favoriteDogs: any[];
  addFavorite: (
    id: string,
    name: string,
    img: any,
    age: string,
    zip_code: string,
    breed: string
  ) => void;
  removeFavorite: (
    id: string,
    name: string,
    img: any,
    age: string,
    zip_code: string,
    breed: string
  ) => void;
  clearFavorites: () => void;
  fetchFavoriteDogs: (page: number, dogsPerPage: number) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteIds: JSON.parse(localStorage.getItem("favorites") || "[]"),
  favoriteDogs: [],

  addFavorite: (id) => {
    set((state) => {
      if (state.favoriteIds.includes(id)) {
        return { favoriteIds: state.favoriteIds };
      }
      const updatedFavorites = [...state.favoriteIds, id];
      console.log("🚀 ~ set ~ updatedFavorites:", updatedFavorites);

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favoriteIds: updatedFavorites };
    });
  },

  removeFavorite: (id) => {
    set((state) => {
      const updatedFavorites = state.favoriteIds.filter(
        (favoriteId) => favoriteId !== id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favoriteIds: updatedFavorites };
    });
  },

  clearFavorites: () => {
    localStorage.removeItem("favorites");
    set({ favoriteIds: [], favoriteDogs: [] }); // Clear both favoriteIds and favoriteDogs
  },

  fetchFavoriteDogs: async () => {
    const { favoriteIds } = get();
    console.log("🚀 ~ fetchFavoriteDogs: ~ favoriteIds:", favoriteIds);

    if (favoriteIds.length === 0) {
      return;
    }

    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(favoriteIds),
        }
      );
      console.log("🚀 ~ fetchFavoriteDogs: ~ response:", response);

      if (!response.ok) {
        throw new Error("Failed to fetch favorite dogs");
      }

      const dogsData = await response.json();
      console.log("🚀 ~ fetchFavoriteDogs: ~ dogsData:", dogsData);

      set({ favoriteDogs: dogsData }); // Store the fetched dog data
    } catch (error) {
      console.error("Error fetching favorite dogs:", error);
    }
  },
}));
