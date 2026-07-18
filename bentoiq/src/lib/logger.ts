export const devLog = (message: string, data?: unknown) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[BentoIQ Debug] ${message}`, data || "");
  }
};
