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

  async createPost({ title, slug, content, imageId, status, userId }) {
    try {
      return await this.database.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        {
          Title: title,
          Content: content,
          featuredImage: imageId,
          Status: status,
          userId: userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error.message || error);
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

  async deletePost(slug) {
    try {
      return await this.database.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
    }
  }


  async getAllPost(queries = [Query.equal("Status", "Active")]) {
  try {
    const res = await this.database.listDocuments(
      config.appWriteDatabaseId,
      config.appWriteCollectionId,
      queries
    );
    return res
  } catch (error) {
    console.error("Appwrite service :: getAllPost :: error", error?.message || error);
    return null;
  }
}

  async uploadFile(file){
    try {
        return await this.bucket.createFile(config.appWriteBucketId, ID.unique(), file)
    } catch (error) {
        console.log("Appwrite service :: uploadFile :: error", error)
    }
  }

  async deleteFile(fileId){
    try {
        return await this.bucket.deleteFile(config.appWriteBucketId, fileId)
    } catch (error) {
        console.log("Appwrite service :: deleteFile :: error", error)
    }
  }

  async getFilePreview({fileId}){
    console.log(fileId)
    return this.bucket.getFilePreview(config.appWriteBucketId, fileId)
  }
}

const dbservices = new Db_services()

export default dbservices;
