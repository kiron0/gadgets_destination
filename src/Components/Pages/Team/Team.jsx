import React from "react";
import { useQuery } from "react-query";
import useTitle from "../../hooks/useTitle";
import Loader from "../Shared/Loader/Loader";
import TItle from "../Shared/Title/Title";
import TeamModals from "./TeamModals";

const Team = () => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mx-auto">
            {teamMembers.map((team) => (
              <div className="card w-96 bg-base-100 shadow-xl" key={team._id}>
                <figure>
                  <img src={team.picture.large} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{team.name}</h2>
                  <div className="card-actions justify-end">
                    <label
                      for="my-modal-3"
                      class="btn btn-primary text-white modal-button"
                    >
                      More Details
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {teamMembers.map((teamModal) => (
            <TeamModals team={teamModal}></TeamModals>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;
