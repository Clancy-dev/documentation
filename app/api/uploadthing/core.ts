import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

export const ourFileRouter = {
  // Route for single image upload
  singleImageUploader: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 1, // Allow only one image
    },
  })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Single image uploaded:", file.url);
      return { uploadedBy: "clancy", fileUrl: file.url };
    }),

  // Route for multiple image uploads
  multipleImageUploader: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 5, // Allow multiple images
    },
  })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Multiple images uploaded:", file.url);
      return { uploadedBy: "clancy", fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
