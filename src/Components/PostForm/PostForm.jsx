import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/Db_service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function PostForm({ post: postData }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm();

  const [previewURL, setPreviewURL] = useState(null);

  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (postData) {
      setValue("Title", postData.Title || "");
      setValue("Slug", postData.Slug || "");
      setValue("Content", postData.Content || "");
      setValue("Status", postData.Status || "Active");
    }
  }, [postData, setValue]);

  const submit = async (data) => {
    const title = data.Title;
    const slug = data.Slug;
    const content = data.Content;
    const featuredImage = data.featuredImage[0];
    const status = data.Status;
    const userId = userData.$id;

    // console.log(title, slug, content, featuredImage, status, userId);

    if (!postData) {
      appwriteService.uploadFile(featuredImage).then(
        (imageUrl) => {
          // console.log(imageUrl);
          appwriteService
            .createPost({ title, content, imageUrl, status, userId })
            .then(
              (postData) => {
                // console.log("post uploaded : ", postData);
                navigate(`/post/${postData.$id}`);
              },
              (e) => {
                // console.log("error while uploading post : ", e);
              }
            );
        },
        (error) => {
          console.log("error while uploading image : ", error);
        }
      );
    } else {
      const url = postData.featuredImage;
      const cleanUrl = url.split(/[?#]/)[0];
      const parts = cleanUrl.split("/");
      const filename = parts.pop();
      const publicId = filename.split(".")[0];

      appwriteService
        .updateFile({ publicId, featuredImage })
        .then((response) => {
          // console.log(response);
          const imageUrl =
            response === "image not updated"
              ? featuredImage
              : response.data.secure_url;

          appwriteService
            .updatePost(postData.$id, {
              title,
              content,
              featuredImage: imageUrl,
              status,
            })
            .then((postData) => {
              // console.log("Post Updated:", postData);
              navigate(`/post/${postData.$id}`);
            })
            .catch((error) => {
              console.error("Update Post Error:", error);
            });
        });
    }
  };

  // Preview imediate uploaded Image, make a bakend request to update the image data to Cloudinary
  const previewImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setPreviewURL(localUrl);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "Title") {
        setValue("Slug", slugTransform(value.Title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col md:flex-row gap-6 bg-white rounded-xl my-4 shadow-xl p-6 md:py-10 animate-fade-in"
    >
      <div className="md:w-5/6 space-y-6">
        <div>
          <Input
            label="Title"
            placeholder="Enter your post title"
            className="mb-2 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 rounded-none"
            {...register("Title", { required: true })}
          />
        </div>

        <div className="">
          <Input
            label="Slug"
            placeholder="Auto-generated slug"
            className="mb-2"
            readOnly
            {...register("Slug", { required: !postData })}
            onInput={(e) =>
              setValue("Slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />
        </div>

        <div className="transition-opacity duration-500">
          <RTE
            label="Content"
            name="Content"
            control={control}
            defaultValue={getValues("Content")}
          />
        </div>
      </div>

      <div className="md:w-2/5 space-y-6">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4 file:mr-4 file:py-2 file:px-4 
         file:rounded-md file:border-0 
         file:text-sm file:font-semibold 
         file:bg-blue-50 file:text-blue-700 
         hover:file:bg-blue-100 
         transition-all duration-300"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredImage", { required: !postData })}
          onChange={previewImage}
        />

        {previewURL || postData?.featuredImage ? (
          <div className="w-full mb-4">
            <img
              src={previewURL || postData.featuredImage}
              alt="Preview"
              className="rounded-lg w-full object-cover max-h-140 shadow-md transition-all duration-300"
            />
          </div>
        ) : (
          <div className="w-full h-64 flex items-center justify-center mb-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-400 text-sm text-center transition-all duration-300 hover:border-blue-400 hover:text-blue-500">
            <div>
              <svg
                className="mx-auto mb-2 w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5V7a4 4 0 014-4h10a4 4 0 014 4v9.5M16 21H8a2 2 0 01-2-2v-1h12v1a2 2 0 01-2 2z"
                />
              </svg>
              <p>
                No image uploaded yet.
                <br />
                Your selected image will appear here.
              </p>
            </div>
          </div>
        )}

        <div className="mb-4 relative">
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Status
          </label>
          <select
            {...register("Status", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
               bg-white text-sm text-gray-800 transition-all duration-300 appearance-none 
               hover:border-blue-400 cursor-pointer"
          >

            <option value="Active">🟢 Active</option>
            <option value="Inactive">🔴 Inactive</option>
          </select>

          {/* Arrow Icon */}
          <div className="absolute top-9 right-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <Button
          type="submit"
          bgColor={postData ? "bg-green-500" : "bg-blue-600"}
          className="w-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          {postData ? "Update Changes" : "Submit ✈️"}
        </Button>
      </div>
    </form>
  );
}
