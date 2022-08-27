import { generateTypes, generateValidations } from "./src/repository";
import { ValidationOptions } from "./src/types";

export const validation = async (options: ValidationOptions): Promise<void> => {
  await generateTypes(options.schemaDirectory, options.typesOutFile);
  await generateValidations(options.schemaDirectory, options.validationOutFile);
};
