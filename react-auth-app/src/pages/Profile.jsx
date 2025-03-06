import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import useSWR from "swr";
import { fetcher } from "../utils/axios";
import { UserResponse } from "../utils/types";

const Profile = () => {
  const history = useHistory();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAccount(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const userId = account?.id;

  const { data: user, error } = useSWR<UserResponse>(`/user/${userId}/`, fetcher);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    history.push("/login");
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full p-6">
        <button
          onClick={handleLogout}
          className="rounded p-2 w-32 bg-red-700 text-white"
        >
          Deconnexion
        </button>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        user ? (
          <div className="w-full h-full text-center items-center">
            <p className="self-center my-auto">Welcome, {user.username}</p>
          </div>
        ) : (
          <p className="text-center">User not found.</p>
        )
      )}
    </div>
  );
};

export default Profile;
