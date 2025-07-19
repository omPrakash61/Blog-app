import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/Db_service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dbservices from "../../appwrite/Db_service";

export default function PostForm(post) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm();

  const navigate = useNavigate();


  
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    console.log(userData)
  },[])

  const submit = async (data) => {
    const title = data.Title
    const slug = data.Slug
    const content = data.Content
    const featuredImage = data.featuredImage[0]
    const status = data.Status
    const userId = userData.$id

    console.log(title, slug, content, featuredImage, status, userId)
    appwriteService.uploadFile(featuredImage).then((imageData) => {
      console.log(imageData)
      const imageId = imageData.$id
      appwriteService.createPost({title, slug, content, imageId, status, userId}).then((postData) =>{ 
        console.log("post uploaded : ",postData)
        navigate(`/post/${postData.$id}`);
      }, (e) => {
        console.log("error while uploading post : ",e)
      })
    }, (error) => {
      console.log("error while uploading image : ",error)
    })


    // if (!data) {
    // const file = data.featuredImage[0]
    //   ? appwriteService.uploadFile(file)
    //   : null;

    // console.log(file);

    // const file = await appwriteService.uploadFile(data.featuredImage[0]);

    
    // const fileId = file.$id;
    // data.featuredImage = fileId;
    // const dbPost = await appwriteService.createPost({
      // data.Title,
    // });
    //     console.log(data.featuredImage[0]);
    //   if (file) {
    //     appwriteService.deleteFile(post.featuredImage);
    //   }

    //   const dbPost = await appwriteService.updatePost(post.$id, {
    //     ...data,
    //     featuredImage: file ? file.$id : undefined,
    //   });

    //   if (dbPost) {
    //     navigate(`/post/${dbPost.$id}`);
    //   }
    // } else {
    // const file = await appwriteService.uploadFile(data.featuredImage[0]);

    // if (1) {
    // const fileId = file.$id;
    // data.featuredImage = fileId;
    // const dbPost = await appwriteService.createPost({
    //   ...data,
    //   userId: userData.$id,
    // });

    // if (dbPost) {
    //   navigate(`/post/${dbPost.$id}`);
    // }
    // }
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
          {...register("Slug", { required: true })}
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
          {...register("featuredImage", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={post.featuredImage}
              alt={post.title}
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
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
