import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Creates a set of queries for a given resource.  Assumes that each resource has a GET, POST, and PUT endpoint.
 * Currently does not support query params, but could be added in the future.
 * @param resource the resource api path
 * @returns
 */
export const createResourceQueries = <T>(resource: string) => {
  return {
    useGet: () => {
      return useQuery({
        queryKey: [resource],
        queryFn: () =>
          fetch(`http://localhost:8080/${resource}`).then(
            handleFetchResponse<T[]>
          ),
      });
    },

    useCreate: () => {
      const queryClient = useQueryClient();

      return useMutation(
        (newItem: T) =>
          fetch(`http://localhost:8080/${resource}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
          }).then(handleFetchResponse),
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [resource] });
          },
        }
      );
    },

    useUpdate: () => {
      const queryClient = useQueryClient();

      return useMutation(
        (item: T & { id: number }) =>
          fetch(`http://localhost:8080/${resource}/${item.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          }).then(handleFetchResponse),
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [resource] });
          },
        }
      );
    },

    useDelete: () => {
      const queryClient = useQueryClient();

      return useMutation(
        (item: T & { id: number }) =>
          fetch(`http://localhost:8080/${resource}/${item.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(handleFetchResponse)
            .catch(console.log),
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [resource] });
          },
        }
      );
    },
  };
};

export const handleFetchResponse = async <T>(
  response: Response
): Promise<T> => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
