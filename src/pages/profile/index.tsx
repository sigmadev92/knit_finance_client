import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import type { User } from "../../types/user";
import { usersURL } from "../../constants/urls/backend";
import { useUser } from "../../contextAPI/contexts/user";
import toast from "react-hot-toast";

const PublicProfile = () => {
  const { user } = useUser();
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState<User | null>(null);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${usersURL}/profile/${userId}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Error in Fetching User Profile ${response.status}`);
      }

      const data: { user: User } = await response.json();
      setUserProfile(data.user);
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };
  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to view this page");
      return;
    }

    fetchUserProfile();
  }, []);
  return (
    <section className="theme">
      <div className="p-4 h-full">
        {!user ? (
          <div className="center">
            <h3>You Must be logged in to view a Profile</h3>
            <NavLink
              to={"/out/login"}
              className="bg-blue-500 px-3 py-1 rounded font-bold"
            >
              Login
            </NavLink>
          </div>
        ) : (
          <div>{userProfile?.fullName}</div>
        )}
      </div>
    </section>
  );
};

export default PublicProfile;
