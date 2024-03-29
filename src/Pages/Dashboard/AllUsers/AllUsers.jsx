import React from "react";
import { useQuery } from "react-query";
import useTitle from "../../../Hooks/useTitle";
import Loading from "../../../Components/Loading/Loading";
import UserRow from "./UserRow";
import { BASE_API } from "../../../config";

const AllUsers = () => {
  useTitle("Manage All Users");
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch(`${BASE_API}/users/all`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading || !users || !users.length) {
    return <Loading></Loading>;
  }
  return (
    <div className="lg:px-10 py-10 bg-base-300 h-screen rounded-md">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-300">
            <tr>
              <th>No</th>
              <th>Uid</th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Remove Admin</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <UserRow
                index={index}
                key={user._id}
                user={user}
                refetch={refetch}
              ></UserRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
