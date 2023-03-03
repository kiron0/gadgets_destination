import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import useTitle from "../../Hooks/useTitle";
import TeamCard from "./TeamCard";
import Loading from "../../Components/Loading/Loading";
import { BASE_API } from "../../config";

const Team = () => {
  useTitle("Team");

  const {
    data: teamMembers,
    isLoading,
    refetch,
  } = useQuery("teamMembers", async () => {
    const res = await fetch(`${BASE_API}/teamMembers`);
    const data = await res.json();
    return data;
  });

  if (
    isLoading ||
    teamMembers?.length === undefined ||
    teamMembers.length === 0
  ) {
    return <Loading />;
  }

  return (
    <div className="h-screen bg-base-100">
      <div className="breadcrumb text-center py-24 bg-base-300">
        <h2 className="text-3xl">Team Page</h2>
        <div className="text-md breadcrumbs ">
          <ul className="justify-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Team </li>
          </ul>
        </div>
      </div>
      <section className="body-font bg-base-100">
        <div className="container md:px-0 px-5 py-12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 lg:gap-14 mx-auto">
            {teamMembers?.map((team) => (
              <TeamCard team={team} key={team._id} refetch={refetch}></TeamCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
