import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Disable CDN so on-demand webhook revalidation always reads fresh published documents.
      useCdn: false,
    })
  : null;
