import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Loading from "../../Components/Loading/Loading";
import { BASE_API } from "../../config";

const MembersDetails = () => {
  const { membersId } = useParams();
  const navigate = useNavigate();
  const [teamDetails, setTeamDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(`${BASE_API}/teamMembers/${membersId}`)
      .then((res) => res.json())
      .then((data) => {
        setTeamDetails(data);
        setIsLoading(false);
      });
  }, [membersId]);

  return (
    <>
      {isLoading || !teamDetails || !teamDetails?.image2 ? (
        <Loading />
      ) : (
        <div className="py-10 md:py-24 lg:py-30 px-3 lg:px-0 md:w-[500px] lg:w-[500px] mx-auto">
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
                src={teamDetails?.image2}
                alt=""
              />
              <h3 className="text-lg font-semibold text-center flex items-center justify-center gap-1">
                {teamDetails?.membersName}
                <div className="badge badge-dark text-white">
                  {teamDetails?.position}
                </div>
              </h3>
              <p className="text-center">{teamDetails?.education}</p>
              <p className="text-center">5th Semester (2019-2020)</p>
              <p className="text-center">{teamDetails?.title}</p>
              <p className="text-center py-4">
                {teamDetails?.aboutYourself?.slice(0, 190)}...
              </p>
              <div className="card-actions">
                <div className="flex items-center mx-auto gap-2 py-2">
                  <button className="btn btn-square btn-sm text-white">
                    <a
                      href={
                        teamDetails?.facebookUrl
                          ? teamDetails?.facebookUrl
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
                        teamDetails?.instagramUrl
                          ? teamDetails?.instagramUrl
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
                        teamDetails?.githubUrl
                          ? teamDetails?.githubUrl
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
      )}
    </>
  );
};

export default MembersDetails;
