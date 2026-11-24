import type { SchemaTypeDefinition } from "sanity";
import {
  localizedString,
  localizedText,
  localizedStringArray,
} from "./objects/localized";
import { profile } from "./profile";
import { experience } from "./experience";
import { education } from "./education";
import { certification } from "./certification";
import { languageCourse } from "./languageCourse";
import { project } from "./project";
import { hackathon } from "./hackathon";
import { volunteering } from "./volunteering";
import { event } from "./event";

export const schemaTypes: SchemaTypeDefinition[] = [
  localizedString,
  localizedText,
  localizedStringArray,
  profile,
  experience,
  education,
  certification,
  languageCourse,
  project,
  hackathon,
  volunteering,
  event,
];
