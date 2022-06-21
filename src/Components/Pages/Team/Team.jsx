import React, { useState } from "react";
import { useQuery } from "react-query";
import useTitle from "../../hooks/useTitle";
import Loader from "../Shared/Loader/Loader";
import TItle from "../Shared/Title/Title";
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
    <div className="h-screen bg-base-100">
      <section className="body-font bg-base-100">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <TItle
              title="Our Projects Team"
              subTitle="What Products we can provide?"
            />
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven't heard of them.
            </p>
          </div>
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
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <img
                className="flex mx-auto py-8 rounded-xl w-52 lg:w-72"
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
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Team;
