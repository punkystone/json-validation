import { readdirSync, readFileSync, writeFileSync } from "fs";
import { compileFromFile } from "json-schema-to-typescript";
import standaloneCode from "ajv/dist/standalone";
import Ajv from "ajv";
import { minify } from "terser";

export const generateTypes = async (
  schemaDirectory: string,
  typesOutFile: string
): Promise<void> => {
  const schemas = readdirSync(schemaDirectory);
  let out = "";
  for (const schema of schemas) {
    out += await compileFromFile(`${schemaDirectory}/${schema}`, {
      bannerComment: "",
    });
  }
  writeFileSync(typesOutFile, out);
};

export const generateValidations = async (
  schemaDirectory: string,
  validationOutFile: string
) => {
  const schemas = readdirSync(schemaDirectory).map((file) =>
    JSON.parse(readFileSync(`${schemaDirectory}/${file}`).toString())
  );
  const mappings: Record<string, string> = {};
  for (const schema of schemas) {
    mappings[`is${schema.$id}`] = schema.$id;
  }
  const code = standaloneCode(
    new Ajv({
      strict: true,
      schemas: schemas,
      code: { source: true, esm: true },
    }),
    mappings
  );

  writeFileSync(
    validationOutFile,
    (
      await minify(code, {
        toplevel: true,
        compress: {
          passes: 2,
        },
      })
    ).code as string
  );
};
