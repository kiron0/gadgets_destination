import React from "react";
import { useNavigate } from "react-router-dom";

const TeamCard = ({ team }) => {
  const navigate = useNavigate();
  const { _id, membersName, image, education, position } = team;
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
            <button
              onClick={() => navigate(`/teamMembers/${_id}`)}
              className="btn btn-primary text-white"
            >
              More Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamCard;
