import axios from "axios";
import { Test } from "./test";

export const resolvers = {
  Query: {
    test: Test
  }
};