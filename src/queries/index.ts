import { Character } from "../lib/types";
import { createResourceQueries } from "./util";

export const {
  useGet: useGetCharacters,
  useUpdate: useUpdateCharacter,
  useCreate: useCreateCharacter,
  useDelete: useDeleteCharacter,
} = createResourceQueries<Character>("characters");
