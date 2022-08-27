export declare interface ValidationOptions {
  readonly schemaDirectory: string;
  readonly typesOutFile: string;
  readonly validationOutFile: string;
}

export declare const validation: (options: ValidationOptions) => Promise<void>;
