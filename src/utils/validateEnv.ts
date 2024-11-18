export function validateEnv(variables: string[]): void {
    variables.forEach((variable) => {
        if (!process.env[variable]) {
            throw new Error(`Missing environment variable: ${variable}`);
        }
    });
}
