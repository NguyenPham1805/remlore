import { type OurFileRouter } from "@remlore/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react";

export const { uploadFiles } = generateReactHelpers<OurFileRouter>();
