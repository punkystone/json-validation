import { generateTypes, generateValidations } from "./repository";
import { type ValidationOptions } from "./types";

export const validation = async (options: ValidationOptions): Promise<void> => {
  await generateTypes(options.schemaDirectory, options.typesOutFile);
  await generateValidations(options.schemaDirectory, options.validationOutFile);
};
