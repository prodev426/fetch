export const getLocation = async (zipCode: string) => {
  const res = await fetch(`https://frontend-take-home-service.fetch.com/locations/${zipCode}`, { credentials: "include" });
  return res.json();
};