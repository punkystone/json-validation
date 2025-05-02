import { writeFileSync } from "fs";
import { compile } from "json-schema-to-typescript";
import type { TSchema } from "@sinclair/typebox";
import type { JSONSchema4 } from "json-schema";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import * as esbuild from "esbuild";

export const generateTypes = async (
    schemas: TSchema[],
    typesOutFile: string,
): Promise<void> => {
    let out = "";
    for (const schema of schemas) {
        const jsonSchema = schema as unknown as JSONSchema4;
        out += await compile(jsonSchema, "", {
            bannerComment: "",
        });
    }
    writeFileSync(typesOutFile, out);
};

export const generateValidations = async (
    schemas: TSchema[],
    validationOutFile: string,
): Promise<void> => {
    let code = "";
    for (const schema of schemas) {
        let func = TypeCompiler.Code(schema);
        func = func.replace(/return(?= function check\(value\) \{)/, `export`);
        func = func.replace(
            /(?<=export function )check(?=\(value\) \{)/,
            `Is${schema.title ?? ""}`,
        );
        code += func;
    }
    const minifiedCode = await esbuild.transform(code, {
        minify: true,
        banner: '"use strict";',
    });
    writeFileSync(validationOutFile, minifiedCode.code);
};
