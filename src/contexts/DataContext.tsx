import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getPodcast } from "../services/api";

import PodcastType from "../types/PodcastType";
import DownloadType from "../types/DownloadType";

interface DataContextType {
    podcast: PodcastType | null;
    filteredPodcast: PodcastType | null;
    setFilteredPodcast: Dispatch<SetStateAction<PodcastType | null>>;
    isFetching: boolean;
    isFiltering: boolean;
    setIsFiltering: Dispatch<SetStateAction<boolean>>;
    downloadList: DownloadType[];
    setDownloadList: Dispatch<SetStateAction<DownloadType[]>>;
}

interface Props {
    children: ReactNode;
}

const DataContext = createContext<DataContextType | null>(null);

export const useDataContext = () => {
    const dataContext = useContext(DataContext);

    if (!dataContext)
        throw new Error("DataContext has to be used within <DataContext.Provider>")

    return dataContext;
}

export default function DataProvider(props: Props) {
    const [podcast, setPodcast] = useState<PodcastType | null>(null);
    const [filteredPodcast, setFilteredPodcast] = useState<PodcastType | null>(null);
    const [downloadList, setDownloadList] = useState<DownloadType[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);

    useEffect(() => {
        async function getPodcastFromApi() {
            try {
                setIsFetching(true);
                const data = await getPodcast();

                if (data !== undefined) {
                    setPodcast(data);
                    setFilteredPodcast(data);
                } else console.log('An error ocurred');

                setIsFetching(false);
            } catch (e) {
                console.log(e);
            }
        }

        async function getDownloadListFromAsyncStorage() {
            try {
                const data = await AsyncStorage.getItem('downloads');

                if (data !== null) {
                    setDownloadList(JSON.parse(data));
                } 
            } catch (e) {
                console.log(e);
            }
        }

        getPodcastFromApi();
        getDownloadListFromAsyncStorage();
    }, []);

    return (
        <DataContext.Provider
            value={{
                podcast,
                isFetching,
                isFiltering,
                setIsFiltering,
                downloadList,
                setDownloadList,
                filteredPodcast,
                setFilteredPodcast
            }}
        >
            {props.children}
        </DataContext.Provider>
    )
}