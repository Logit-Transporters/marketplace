import { loadEnvConfig } from "@next/env";
import type { CodegenConfig } from "@graphql-codegen/cli";

// @ts-ignore
loadEnvConfig(process.cwd());

// @ts-ignore
let schemaUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL;

// @ts-ignore
if (process.env.GITHUB_ACTION === "generate-schema-from-file") {
	schemaUrl = "schema.graphql";
}

if (!schemaUrl) {
	// @ts-ignore
	console.error(
		"Before GraphQL types can be generated, you need to set NEXT_PUBLIC_SALEOR_API_URL environment variable.",
	);
	// @ts-ignore
	console.error("Follow development instructions in the README.md file.");
	// @ts-ignore
	process.exit(1);
}

const config: CodegenConfig = {
	overwrite: true,
	schema: schemaUrl,
	documents: "src/graphql/**/*.graphql",
	generates: {
		"src/gql/": {
			preset: "client",
			plugins: [],
			config: {
				documentMode: "string",
				useTypeImports: true,
				strictScalars: true,
				scalars: {
					Date: "string",
					DateTime: "string",
					Day: "number",
					Decimal: "number",
					GenericScalar: "unknown",
					JSON: "unknown",
					JSONString: "string",
					Metadata: "Record<string, string>",
					Minute: "number",
					PositiveDecimal: "number",
					UUID: "string",
					Upload: "unknown",
					WeightScalar: "unknown",
					_Any: "unknown",
				},
			},
			presetConfig: {
				fragmentMasking: false,
			},
		},
	},
};

export default config;
