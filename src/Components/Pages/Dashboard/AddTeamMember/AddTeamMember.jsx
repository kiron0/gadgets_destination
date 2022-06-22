import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useTitle from "../../../hooks/useTitle";
import { toast } from "react-hot-toast";
import auth from "../../Shared/Firebase/Firebase.init";

const AddTeamMember = () => {
  useTitle("Add Team Member");
  const upload_api_key = `e1a6a4f77bc884f9b46b0d06d86c05e5`;
  const [isFile, setIsFile] = useState(false);
  const [isFile2, setIsFile2] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [loading, setLoading] = useState("false");
  const onSubmit = (data) => {
    setLoading(false);
    if (!isFile || !isFile2) {
      const url = `https://api.imgbb.com/1/upload?key=${upload_api_key}`;

      const fd = new FormData();
      fd.append("image", data?.memberImage[0]);
      fd.append("image", data?.memberImage[1]);

      console.log(data, fd);

      fetch(url, {
        method: "POST",
        body: fd,
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result?.data);
          if (result?.success) {
            saveMembersDataOnMongodb(
              result?.data?.url,
              result?.data?.memberImage2?.url,
              data
            );
            setLoading(true);
          }
        });
    } else {
      const inputURL = data?.imageUrl;
      const inputURL2 = data?.imageUrl2;
      saveMembersDataOnMongodb(inputURL, inputURL2, data);
      setLoading(true);
    }
  };

  const saveMembersDataOnMongodb = async (image, image2, data) => {
    const membersData = {
      membersName: data?.membersName,
      education: data?.education,
      position: data?.position,
      facebookUrl: data?.facebookUrl,
      instagramUrl: data?.instagramUrl,
      githubUrl: data?.githubUrl,
      aboutYourself: data?.aboutYourself,
      image: image || data?.inputURL,
      image2: image2 || data?.inputURL2,
      createdAt:
        new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      addedBy: {
        name: auth?.currentUser?.displayName,
        uid: auth?.currentUser?.uid,
        email: auth?.currentUser?.email,
      },
    };

    await fetch(`http://localhost:5000/teamMembers`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(membersData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.insertedId) {
          toast.success("New Team Members Added Successfully");
          reset();
        }
      });
  };

  return (
    <div className="p-5">
      <h3 className="text-2xl font-semibold mb-2">Add Team Member</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="shadow rounded bg-base-100 p-5 md:p-10"
      >
        <div className="my-2">
          <label htmlFor="name" className="my-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            {...register("membersName", { required: true })}
          />
          {errors.membersName?.type === "required" && (
            <span className="text-error">Name is required</span>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center gap-x-3 w-full">
          <div className="my-2 w-full">
            <label htmlFor="name" className="my-2">
              Education Background
            </label>
            <input
              type="text"
              placeholder="Education Background"
              className="input input-bordered w-full"
              {...register("education", { required: true })}
            />
            {errors.education?.type === "required" && (
              <span className="text-error">
                Education Background is required
              </span>
            )}
          </div>
          <div className="my-2 w-full">
            <label htmlFor="name" className="my-2">
              Position
            </label>
            <input
              type="text"
              placeholder="Your Position"
              className="input input-bordered w-full"
              {...register("position", { required: true })}
            />
            {errors.position?.type === "required" && (
              <span className="text-error">Position is required</span>
            )}
          </div>
        </div>
        <p className="my-4 text-center text-xl">Social Media Links</p>
        <div className="flex flex-col md:flex-row items-center gap-3 w-full">
          <div className="my-2 w-full">
            <label htmlFor="facebook" className="my-2">
              Facebook
            </label>
            <input
              type="text"
              placeholder="Facebook"
              className="input input-bordered w-full"
              id="facebook"
              {...register("facebookUrl", { required: true })}
            />
            {errors.facebookUrl?.type === "required" && (
              <span className="text-error">Facebook URL is required</span>
            )}
          </div>
          <div className="my-2 w-full">
            <label htmlFor="instagram" className="my-2">
              Instagram
            </label>
            <input
              type="text"
              placeholder="Instagram"
              className="input input-bordered w-full"
              {...register("instagramUrl", { required: true })}
            />
            {errors.instagramUrl?.type === "required" && (
              <span className="text-error">Instagram URL is required</span>
            )}
          </div>
          <div className="my-2 w-full">
            <label htmlFor="name" className="my-2">
              Github
            </label>
            <input
              type="text"
              placeholder="Github"
              className="input input-bordered w-full"
              {...register("githubUrl", { required: true })}
            />
            {errors.githubUrl?.type === "required" && (
              <span className="text-error">Github URL is required</span>
            )}
          </div>
        </div>
        <div className="my-2">
          <label htmlFor="name" className="my-2">
            About Yourself
          </label>
          <textarea
            name=""
            id="desc"
            className="textarea textarea-bordered w-full my-1"
            cols="30"
            placeholder="About Yourself"
            rows="2"
            {...register("aboutYourself", { required: true })}
            style={{ resize: "none", height: "6rem" }}
          ></textarea>
          {errors.aboutYourself?.type === "required" && (
            <span className="text-error">About Yourself is required</span>
          )}
        </div>
        <div>
          <label htmlFor="file" className="my-2 block">
            Avatar
            <button
              type="button"
              className="btn btn-xs mx-2 text-white"
              onClick={() => setIsFile((prev) => !prev)}
            >
              {isFile ? "Upload" : "URL"}
            </button>
          </label>
          {isFile ? (
            <input
              type="url"
              name="file"
              className="input input-bordered w-full"
              placeholder="Put Your Image Link"
              id="file"
              {...register("imageUrl", { required: true })}
            />
          ) : (
            <input
              type="file"
              name="file"
              className="block border p-2 w-full rounded"
              id="file"
              {...register("memberImage", { required: true })}
              multiple
            />
          )}
          {errors.memberImage?.type === "required" ||
            (errors.imageUrl?.type === "required" && (
              <span className="text-error">
                Product Image Field is required
              </span>
            ))}
        </div>
        <div className="my-2">
          <label htmlFor="file" className="my-2 block">
            Detail Image
            <button
              type="button"
              className="btn btn-xs mx-2 text-white"
              onClick={() => setIsFile2((prev) => !prev)}
            >
              {isFile2 ? "Upload" : "URL"}
            </button>
          </label>
          {isFile2 ? (
            <input
              type="url"
              name="file"
              className="input input-bordered w-full"
              placeholder="Put Your Image Link"
              id="file"
              {...register("imageUrl2", { required: true })}
            />
          ) : (
            <input
              type="file"
              name="file"
              className="block border p-2 w-full rounded"
              id="file"
              {...register("memberImage", { required: true })}
              multiple
            />
          )}
          {errors.memberImage?.type === "required" && (
            <span className="text-error">Detail Image is required</span>
          )}
        </div>
        <div className="my-3 text-right">
          <button
            className="btn btn-primary text-white"
            disabled={!loading && true}
          >
            {!loading ? "Adding Member..." : "Add Member"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeamMember;
