import type { TSchema } from "@sinclair/typebox";

export interface ValidationOptions {
    readonly schemas: TSchema[];
    readonly typesOutFile: string;
    readonly validationOutFile: string;
}
