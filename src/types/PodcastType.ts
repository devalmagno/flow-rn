import EpisodeType from "./EpisodeType";

export default interface PodcastType {
    title: string;
    description: string;
    rss: string;
    copyright: string;
    episodes: EpisodeType[];
}