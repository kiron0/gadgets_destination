import React from "react";

const TeamDetails = ({ team, setModalTeam }) => {
  const { _id, name, picture, description, education } = team;
  return (
    <>
      <div class="card w-100 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <img src={picture.large} alt="" class="w-64 lg:w-52 rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">{name}</h2>
          <p>{education}</p>
          <div class="card-actions pt-6 lg:pt-0">
            <label
              htmlFor="team-modal"
              className="btn btn-primary text-white modal-button"
              onClick={() =>
                setModalTeam({ _id, name, picture, description, education })
              }
            >
              More Details
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamDetails;
