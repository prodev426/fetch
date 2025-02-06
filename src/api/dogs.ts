export const getDogs = async ({ breed = "", size = 10, from = 0 }) => {
  const res = await fetch(
    `https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breed}&size=${size}&from=${from}`,
    {
      credentials: "include",
    }
  );
  const data = await res.json();
  return data.resultIds;
};

export const getDogsData = async (body) => {
  await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
    method: "POST",
    body,
  });

  const res = await fetch(
    `https://frontend-take-home-service.fetch.com/dogs`,
    body
  );
  const data = await res.json();
  return data.resultIds;
};

export const getBreeds = async () => {
  const res = await fetch(
    "https://frontend-take-home-service.fetch.com/dogs/breeds",
    { credentials: "include" }
  );
  return res.json();
};
