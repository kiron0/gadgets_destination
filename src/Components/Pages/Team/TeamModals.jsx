import React from "react";

const TeamModals = ({ team }) => {
  return (
    <div>
      <input type="checkbox" id="my-modal-3" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative">
          <label
            for="my-modal-3"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <img className="flex mx-auto py-8" src={team.picture.large} alt="" />
          <h3 class="text-lg font-bold text-center">{team.name}</h3>
          <p className="text-center">{team.title}</p>
          <p class="py-4">{team.description.slice(0, 80)}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamModals;
