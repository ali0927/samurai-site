import axios from "axios";

export const resolvers = {
  Query: {
    test: async () => {
      try {
        return "Hello!"
      } catch (error) {
        throw error;
      }
    }
  }
};