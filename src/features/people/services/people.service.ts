import { api } from "@/lib/api";

import type { FindPeopleResponse, PeopleFilters } from "../types";

export const peopleService = {
  findPeople: async (filters: PeopleFilters): Promise<FindPeopleResponse> => {
    const { data } = await api.post<FindPeopleResponse>(
      "/api/github/people",
      filters
    );
    return data;
  },
};
