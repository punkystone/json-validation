import type { TSchema } from "@sinclair/typebox";

export declare interface ValidationOptions {
    readonly schemas: TSchema[];
    readonly typesOutFile: string;
    readonly validationOutFile: string;
}

export declare const validation: (options: ValidationOptions) => Promise<void>;
