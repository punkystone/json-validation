import { generateTypes, generateValidations } from "./repository";
import { type ValidationOptions } from "./types";

export const validation = async (options: ValidationOptions): Promise<void> => {
    await generateTypes(options.schemas, options.typesOutFile);
    await generateValidations(options.schemas, options.validationOutFile);
};
