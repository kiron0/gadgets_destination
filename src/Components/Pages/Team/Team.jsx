import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import useTitle from "../../hooks/useTitle";
import Loader from "../Shared/Loader/Loader";
import TeamDetails from "./TeamDetails";

const Team = () => {
  const [modalTeam, setModalTeam] = useState({});
  useTitle("Team");
  const {
    data: teamMembers,
    isLoading,
    refetch,
  } = useQuery("teamMembers", async () => {
    const res = await fetch(
      "https://gadgets-destination.herokuapp.com/teamMembers"
    );
    const data = await res.json();
    return data;
  });

  if (
    isLoading ||
    teamMembers?.length === undefined ||
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
        <div className="container px-5 py-12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14 mx-auto">
            {teamMembers.map((team) => (
              <TeamDetails
                team={team}
                key={team._id}
                setModalTeam={setModalTeam}
                refetch={refetch}
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
                className="btn btn-sm btn-circle absolute right-2 top-2 text-white"
              >
                ✕
              </label>
              <img
                className="flex mx-auto my-4 w-52 lg:w-72 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                src={modalTeam?.image2}
                alt=""
              />
              <h3 className="text-lg font-semibold text-center flex items-center justify-center gap-1">
                {modalTeam?.membersName}
                <div className="badge badge-dark text-white">
                  {modalTeam?.position}
                </div>
              </h3>
              <p className="text-center">{modalTeam?.education}</p>
              <p className="text-center">5th Semester (2019-2020)</p>
              <p className="text-center">{modalTeam?.title}</p>
              <p className="text-center py-4">
                {modalTeam?.aboutYourself?.slice(0, 190)}...
              </p>
              <div className="card-actions">
                <div className="flex items-center mx-auto gap-2 py-2">
                  <button className="btn btn-square btn-sm text-white">
                    <a
                      href={
                        modalTeam?.facebookUrl
                          ? modalTeam?.facebookUrl
                          : "https://www.facebook.com/"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaFacebookF />
                    </a>
                  </button>
                  <button className="btn btn-square btn-sm text-white">
                    <a
                      href={
                        modalTeam?.instagramUrl
                          ? modalTeam?.instagramUrl
                          : "https://instagram.com"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaInstagram />
                    </a>
                  </button>
                  <button className="btn btn-square btn-sm text-white">
                    <a
                      href={
                        modalTeam?.githubUrl
                          ? modalTeam?.githubUrl
                          : "https://github.com"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaGithub />
                    </a>
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
