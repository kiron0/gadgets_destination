import React from "react";

const TeamDetails = ({ team, setModalTeam, refetch }) => {
  const {
    _id,
    membersName,
    image,
    image2,
    education,
    position,
    facebookUrl,
    instagramUrl,
    githubUrl,
    aboutYourself,
  } = team;
  return (
    <>
      <div className="card w-100 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={image} alt="" className="w-64 lg:w-72 mask mask-hexagon" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{membersName}</h2>
          <p className="text-center">{education}</p>
          <p className="text-center">5th Semester (2019-2020)</p>
          <div
            className={
              position === "Team Member"
                ? "badge badge-outline mt-1 lg:mt-0"
                : "badge badge-dark text-white mt-1 lg:mt-0"
            }
          >
            {position}
          </div>
          <div className="card-actions pt-6">
            <label
              htmlFor="team-modal"
              className="btn btn-primary text-white modal-button"
              onClick={() =>
                setModalTeam({
                  _id,
                  membersName,
                  image,
                  image2,
                  education,
                  position,
                  facebookUrl,
                  instagramUrl,
                  githubUrl,
                  aboutYourself,
                })
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
