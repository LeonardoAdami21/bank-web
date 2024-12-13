import jwtDecode from "jwt-decode";

export const getUserRole = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("Token not found");
    return null;
  }

  try {
    const decodedToken = await jwtDecode(token);
    return decodedToken?.profile || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
