import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {API_URL} from "../utils/constant"
const useFollow = () => {
  
  const queryClient = useQueryClient();

  const {
    mutate: follow,
    isPending :isFollowing,
  } = useMutation({
    mutationFn: async (userId) => {
      try {
        const res = await fetch(`${API_URL}/api/users/follow/${userId}`, {
          method: "POST",
          credentials:"include"
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { follow, isFollowing };
};

export default useFollow;
