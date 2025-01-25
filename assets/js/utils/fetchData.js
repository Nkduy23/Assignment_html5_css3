import { basePath } from '../base.js';

export const fetchData = async (endpoint) => {
    try {
      const response = await fetch(`${basePath}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };