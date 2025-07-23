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
      // You can skip featuredImage as it's a file input
    }
  }, [postData, setValue]);

  const submit = async (data) => {
    const title = data.Title;
    const slug = data.Slug;
    const content = data.Content;
    const featuredImage = data.featuredImage[0];
    const status = data.Status;
    const userId = userData.$id;

    console.log(title, slug, content, featuredImage, status, userId);

    if (!postData) {
      appwriteService.uploadFile(featuredImage).then(
        (imageUrl) => {
          console.log(imageUrl);
          appwriteService
            .createPost({ title, content, imageUrl, status, userId })
            .then(
              (postData) => {
                console.log("post uploaded : ", postData);
                navigate(`/post/${postData.$id}`);
              },
              (e) => {
                console.log("error while uploading post : ", e);
              }
            );
        },
        (error) => {
          console.log("error while uploading image : ", error);
        }
      );
    } else {
      // Steps to find image-publicId from Cloudinary url
      const url = postData.featuredImage;
      const cleanUrl = url.split(/[?#]/)[0];
      const parts = cleanUrl.split("/");
      const filename = parts.pop();
      const publicId = filename.split(".")[0];

      appwriteService
        .updateFile({  publicId, featuredImage })
        .then((response) => {
          console.log(response); // { success: true, data: {...} }
          const imageUrl = response === "image not updated" ? featuredImage : response.data.secure_url;

          appwriteService
            .updatePost(postData.$id, {
              title,
              content,
              featuredImage: imageUrl,
              status,
            })
            .then((postData) => {
              console.log("Post Updated:", postData);
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
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-3/5 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("Title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          readOnly
          {...register("Slug", { required: !postData })}
          onInput={(e) => {
            setValue("Slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="Content"
          control={control}
          defaultValue={getValues("Content")}
        />
      </div>
      <div className="w-2/5 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredImage", { required: !postData })}
          onChange={(e) => {
            previewImage(e);
          }}
        />
        {(previewURL || postData?.featuredImage) && (
          <div className="w-full mb-4">
            <img
              src={previewURL || postData.featuredImage}
              alt="Preview"
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["Active", "Inactive"]}
          label="Status"
          className="mb-4"
          {...register("Status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={postData ? "bg-green-500" : "bg-blue-600"}
          className="w-full"
        >
          {postData ? "Update-Changes" : "Submit ✈️"}
        </Button>
      </div>
    </form>
  );
}
