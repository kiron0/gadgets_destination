import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import Loader from "../Shared/Loader/Loader";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const MembersDetails = () => {
  const { membersId } = useParams();
  const navigate = useNavigate();

  const { data: membersDetails, isLoading } = useQuery(
    "membersDet",
    async () => {
      const res = await fetch(
        `https://gadgets-destination.herokuapp.com/teamMembers/${membersId}`
      );
      const data = await res.json();
      return data;
    }
  );

  if (isLoading || !membersDetails) {
    return <Loader></Loader>;
  }
  return (
    <>
      <div className="py-28 md:py-48 lg:py-44 px-3 lg:px-0 md:w-[500px] lg:w-[500px] mx-auto h-screen">
        <div className="card w-100 bg-base-100 p-5 shadow-xl">
          <div className="relative">
            <label
              onClick={() => navigate(-1)}
              className="btn btn-sm btn-circle absolute left-2 top-2 text-white bg-primary border-primary hover:bg-primary hover:border-primary"
            >
              <MdOutlineArrowBackIosNew className="text-lg" />
            </label>
            <img
              className="flex mx-auto my-6 lg:my-12 w-52 lg:w-64 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
              src={membersDetails?.image2}
              alt=""
            />
            <h3 className="text-lg font-semibold text-center flex items-center justify-center gap-1">
              {membersDetails?.membersName}
              <div className="badge badge-dark text-white">
                {membersDetails?.position}
              </div>
            </h3>
            <p className="text-center">{membersDetails?.education}</p>
            <p className="text-center">5th Semester (2019-2020)</p>
            <p className="text-center">{membersDetails?.title}</p>
            <p className="text-center py-4">
              {membersDetails?.aboutYourself?.slice(0, 190)}...
            </p>
            <div className="card-actions">
              <div className="flex items-center mx-auto gap-2 py-2">
                <button className="btn btn-square btn-sm text-white">
                  <a
                    href={
                      membersDetails?.facebookUrl
                        ? membersDetails?.facebookUrl
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
                      membersDetails?.instagramUrl
                        ? membersDetails?.instagramUrl
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
                      membersDetails?.githubUrl
                        ? membersDetails?.githubUrl
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
      </div>
    </>
  );
};

export default MembersDetails;
