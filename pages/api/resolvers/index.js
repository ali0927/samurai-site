import axios from "axios";
import { Test } from "./test";
import { Burn } from "./burn";

export const resolvers = {
  Query: {
    test: Test
  },
  Mutation: {
    burn: Burn
  }
};
