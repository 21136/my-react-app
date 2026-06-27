const DEFAULT_API_BASE = "https://jsonplaceholder.typicode.com";

export const API_BASE = 
 import.meta.env.VITE_API_BASE?.replace(/\/$/,"") ||DEFAULT_API_BASE;

export const APP_TITLE =
 import.meta.env.VITE_APP_TITLE || "my-react-app";

export const IS_DEV = import.meta.env.DEV;