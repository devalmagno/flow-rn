import axios from 'axios';
import * as rssParser from 'react-native-rss-parser';

import PodcastType from '../types/PodcastType';
import EpisodeType from '../types/EpisodeType';

export const getPodcast = async () => {
    const link = 'https://anchor.fm/s/a5637400/podcast/rss';

    try {
        const { data } = await axios.get(link);
        const feed = await rssParser.parse(data);
        const episodes: EpisodeType[] = feed.items.map(episode => ({
            title: episode.title,
            creator: episode.authors.map(e => e ? e.name : '').toString().replaceAll(',', ', '),
            url: episode.enclosures.map(e => e.url).toString(),
            pubDate: episode.published,
            content: episode.description.substring(3).replaceAll('</p>', ''),
            image: episode.itunes.image ? episode.itunes.image : '',
            duration: episode.itunes.duration,
        }));

        const podcast: PodcastType = {
            title: feed.title,
            description: feed.description,
            copyright: feed.itunes.owner.name,
            rss: feed.links.map(e => e.url).toString(),
            episodes,
        }

        return podcast;
    } catch (err) {
        console.error
    }
}