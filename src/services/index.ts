import axiosInstance from "./client";
import {
  IEpisode,
  IEpisodesResponse,
  IPodcastDetail,
  IPodcastFromTop100,
  IPodcastResponse,
  ITop100PodcastResponse,
} from "./interfaces";

interface IITunesServices {
  getTop100Podcasts(): Promise<IPodcastFromTop100[]>;
  getPodcastById(id: string): Promise<IPodcastDetail>;
  getEpisodesByPodcastId(id: string): Promise<IEpisode[]>;
  getEpisode(podcastId: string, guid: string): Promise<IEpisode | undefined>;
}

export class ITunesServices implements IITunesServices {
  async getTop100Podcasts(): Promise<IPodcastFromTop100[]> {
    const url = `/us/rss/toppodcasts/limit=100/genre=1310/json`;
    const response = await axiosInstance.get<ITop100PodcastResponse>(url);
    return response.data.feed.entry;
  }

  async getPodcastById(id: string): Promise<IPodcastDetail> {
    const url = `/lookup?id=${id}`;
    const response = await axiosInstance.get<IPodcastResponse>(url);
    return response.data.results[0];
  }

  async getEpisodesByPodcastId(id: string): Promise<IEpisode[]> {
    const url = `/lookup?id=${id}&entity=podcastEpisode&limit=15`;
    const response = await axiosInstance.get<IEpisodesResponse>(url);
    return response.data.results.slice(1);
  }

  async getEpisode(podcastId: string, guid: string): Promise<IEpisode | undefined> {
    const url = `/lookup?id=${podcastId}&entity=podcastEpisode&limit=15`;
    const response = await axiosInstance.get<IEpisodesResponse>(url);
    return response.data.results.find((episode) => episode.episodeGuid === guid);
  }

}
