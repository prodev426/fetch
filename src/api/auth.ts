export const login = async (name: string, email: string) => {
  const res = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  return res.ok;
};
