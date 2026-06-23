import { useMutation } from "@tanstack/react-query";

import { peopleService } from "../services/people.service";

export const useFindPeople = () => {
  return useMutation({
    mutationFn: peopleService.findPeople,
  });
};
