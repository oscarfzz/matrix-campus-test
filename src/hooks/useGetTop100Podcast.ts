import { ITunesServices } from "@src/services";
import { IPodcastFromTop100 } from "@src/services/interfaces";
import { QUERYKEYS } from "@src/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useGetTop100Podcast = () => {
  const [text, setText] = useState("");

  const service = new ITunesServices();
  const { data = [], ...rest } = useQuery<IPodcastFromTop100[]>({
    queryKey: [QUERYKEYS.TOP],
    queryFn: service.getTop100Podcasts,
    refetchOnWindowFocus: false,
  });

  return {
    data: data.filter((item) => {
        const itemName = item["im:name"].label.toLowerCase();
        const artistName = item["im:artist"].label.toLowerCase();
        return itemName.includes(text) || artistName.includes(text)
    }
    ),
    setText,
    ...rest,
  };
};
