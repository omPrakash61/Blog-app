const config = {
    appWriteURL: String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId: String(import.meta.env.VITE_APPWITE_PROJECT_ID),
    appWriteDatabaseId: String(import.meta.env.VITE_APPWITE_DATABASE_ID),
    appWriteCollectionId: String(import.meta.env.VITE_APPWITE_COLLECTION_ID),
    BACKEND_URL: String(import.meta.env.BACKEND_URL)
}

export default config