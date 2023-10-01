declare module "bun" {
  interface Env {
    VITE_API_URL: string;
    VITE_API_PORT: number;
  }
}