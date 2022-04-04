import axios from "axios";
import { Test } from "./test";
import { Claim } from "./claim";

export const resolvers = {
  Query: {
    test: Test
  },
  Mutation: {
    claim: Claim
  }
};