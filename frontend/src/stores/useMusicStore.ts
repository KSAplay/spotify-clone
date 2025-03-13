import { axiosInstance } from '@/lib/axios';
import { Album, Song, Stats } from '@/types';
import { create } from 'zustand';
import { toast } from 'sonner'

interface MusicStore {
  albums: Album[];
  songs: Song[];
  stats: Stats;
  isLoadingDelete: boolean;
  isLoadingSongs: boolean;
  isLoadingAlbum: boolean;
  isLoadingAlbums: boolean;
  isLoadingStats: boolean;
  isLoadingFeaturedSongs: boolean;
  isLoadingMadeForYouSongs: boolean;
  isLoadingTrendingSongs: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];

  fetchAlbums: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;

  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
}


export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0
  },
  isLoadingDelete: false,
  isLoadingSongs: false,
  isLoadingAlbums: false,
  isLoadingAlbum: false,
  isLoadingStats: false,
  isLoadingFeaturedSongs: false,
  isLoadingMadeForYouSongs: false,
  isLoadingTrendingSongs: false,
  error: null,
  currentAlbum: null,
  featuredSongs: [],
  madeForYouSongs: [],
  trendingSongs: [],

  fetchAlbums: async () => {
    set({ isLoadingAlbums: true, error: null });

    try {
      const response = await axiosInstance.get('/albums');
      set({ albums: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoadingAlbums: false });
    }
  },

  fetchStats: async () => {
    set({ isLoadingStats: true, error: null });

    try {
      const response = await axiosInstance.get('/stats');
      set({ stats: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoadingStats: false });
    }
  },

  fetchSongs: async () => {
    set({ isLoadingSongs: true, error: null });

    try {
      const response = await axiosInstance.get('/songs');
      set({ songs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoadingSongs: false });
    }
  },

  fetchAlbumById: async (id) => {
    set({ isLoadingAlbum: true, error: null });

    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoadingAlbum: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoadingFeaturedSongs: true, error: null });

    try {
      const response = await axiosInstance.get('/songs/featured');
      set({ featuredSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoadingFeaturedSongs: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoadingMadeForYouSongs: true, error: null });

    try {
      const response = await axiosInstance.get('/songs/made-for-you');
      set({ madeForYouSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoadingMadeForYouSongs: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoadingTrendingSongs: true, error: null });

    try {
      const response = await axiosInstance.get('/songs/trending');
      set({ trendingSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoadingTrendingSongs: false });
    }
  },

  deleteSong: async (id) => {
    set({ isLoadingDelete: true, error: null });
    try {
      await axiosInstance.delete(`/admin/songs/${id}`);

      set((state) => ({
        songs: state.songs.filter((song) => song._id !== id),
      }));
      toast.success("Canción eliminada con éxito");
    } catch (error: any) {
      console.log("Error al eliminar la canción", error);
      toast.error("Error al eliminar la canción");
    } finally {
      set({ isLoadingDelete: false });
    }
  },

  deleteAlbum: async (id) => {
    set({ isLoadingDelete: true, error: null });
    try {
      await axiosInstance.delete(`/admin/albums/${id}`);
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.map((song) =>
          song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song
        ),
      }));
      toast.success("Álbum eliminado con éxito");
    } catch (error: any) {
      toast.error("Error al eliminar el álbum: " + error.message);
    } finally {
      set({ isLoadingDelete: false });
    }
  }
}));