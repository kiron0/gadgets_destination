import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { BsTwitter } from "react-icons/bs";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import useTitle from "../../hooks/useTitle";
import Loader from "../Shared/Loader/Loader";
import TeamDetails from "./TeamDetails";

const Team = () => {
  const [modalTeam, setModalTeam] = useState({});
  useTitle("Team");
  const { data: teamMembers, isLoading } = useQuery("teamMembers", async () => {
    const res = await fetch("http://localhost:5000/teamMembers", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await res.json();
    return data;
  });

  if (
    isLoading ||
    teamMembers?.length === undefined ||
    teamMembers === null ||
    !teamMembers ||
    teamMembers.length === 0
  ) {
    return <Loader />;
  }

  return (
    <div className="h-screen bg-base-100 py-16">
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
        <div className="container px-5 py-24 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14 mx-auto">
            {teamMembers.map((team) => (
              <TeamDetails
                team={team}
                key={team._id}
                setModalTeam={setModalTeam}
              ></TeamDetails>
            ))}
          </div>
        </div>
      </section>
      {modalTeam && (
        <>
          <input type="checkbox" id="team-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="team-modal"
                className="btn btn-sm btn-circle btn-primary absolute right-2 top-2 text-white"
              >
                ✕
              </label>
              <img
                className="flex mx-auto py-8 w-52 lg:w-72"
                src={modalTeam?.picture?.large}
                alt=""
              />
              <h3 className="text-lg font-bold text-center">
                {modalTeam?.name}
              </h3>
              <p className="text-center">{modalTeam?.education}</p>
              <p className="text-center">{modalTeam?.title}</p>
              <p className="text-center py-4">
                {modalTeam?.description?.slice(0, 150)}
              </p>
              <div className="card-actions">
                <div className="flex items-center mx-auto gap-2 py-2">
                  <button className="btn btn-square btn-sm text-white">
                    <FaFacebookF />
                  </button>
                  <button className="btn btn-square btn-sm text-white">
                    <BsTwitter />
                  </button>
                  <button className="btn btn-square btn-sm text-white">
                    <FaLinkedinIn />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Team;
