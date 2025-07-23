import config from "../config/config";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Db_services {
  client = new Client();

  constructor() {
    this.client
      .setEndpoint(config.appWriteURL)
      .setProject(config.appWriteProjectId);

    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, content, imageUrl, status, userId }) {
    // working
    try {
      return await this.database.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        ID.unique(),
        {
          Title: title,
          Content: content,
          featuredImage: imageUrl,
          Status: status,
          userId: userId,
        }
      );
    } catch (error) {
      console.log(
        "Appwrite service :: createPost :: error",
        error.message || error
      );
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        {
          Title: title,
          Content: content,
          featuredImage: featuredImage,
          Status: status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(postId) {
    try {
      return await this.database.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        postId
      );
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
    }
  }

  async getPost(postId) {
    // working
    try {
      const result = await this.database.getDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        postId
      );
      return result;
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
    }
  }

  async getAllPost(queries = [Query.equal("Status", "Active")]) {
    // working
    try {
      const res = await this.database.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        queries
      );
      return res;
    } catch (error) {
      console.error(
        "Appwrite service :: getAllPost :: error",
        error?.message || error
      );
      return null;
    }
  }

  async uploadFile(image) {
    // working
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Blogs-Preset");
    formData.append("cloud_name", "df6vpteqd");
    formData.append("folder", "picwords");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/df6vpteqd/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Uploaded Image URL:", data.secure_url);
      return data.secure_url;
    } catch (err) {
      console.error("Upload Error:", err);
    }
  }

  async deleteFile(publicId) {
    const res = await fetch("http://localhost:5000/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || "Failed to delete");
    }

    const data = await res.json();
    return data;
  }

  async updateFile({ publicId, featuredImage }) {
    if (!featuredImage) return "image not updated";
    else {
      const formData = new FormData();
      formData.append("image", featuredImage);
      formData.append("publicId", publicId);

      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const response = await res.json();
      console.log(response);
      return response;
    }
  }
}

const dbservices = new Db_services();

export default dbservices;
