import { useState, useEffect, useCallback } from 'react';

export type ReadingStatus = 'want-to-read' | 'currently-reading' | 'finished' | null;

export interface ReadingListItem {
  workId: string;
  status: ReadingStatus;
  dateAdded: string;
  dateStarted?: string;
  dateFinished?: string;
  rating?: number; // 1-5 stars
}

const STORAGE_KEY = 'heinlein-reading-list';

export function useReadingList() {
  const [readingList, setReadingList] = useState<ReadingListItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setReadingList(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load reading list:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever list changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(readingList));
      } catch (error) {
        console.error('Failed to save reading list:', error);
      }
    }
  }, [readingList, isLoaded]);

  const getStatus = useCallback((workId: string): ReadingStatus => {
    const item = readingList.find(i => i.workId === workId);
    return item?.status || null;
  }, [readingList]);

  const getItem = useCallback((workId: string): ReadingListItem | undefined => {
    return readingList.find(i => i.workId === workId);
  }, [readingList]);

  const setStatus = useCallback((workId: string, status: ReadingStatus) => {
    setReadingList(prev => {
      const existing = prev.find(i => i.workId === workId);
      
      if (status === null) {
        // Remove from list
        return prev.filter(i => i.workId !== workId);
      }
      
      const now = new Date().toISOString();
      
      if (existing) {
        // Update existing
        return prev.map(i => {
          if (i.workId !== workId) return i;
          return {
            ...i,
            status,
            dateStarted: status === 'currently-reading' && !i.dateStarted ? now : i.dateStarted,
            dateFinished: status === 'finished' ? now : undefined
          };
        });
      } else {
        // Add new
        return [...prev, {
          workId,
          status,
          dateAdded: now,
          dateStarted: status === 'currently-reading' ? now : undefined,
          dateFinished: status === 'finished' ? now : undefined
        }];
      }
    });
  }, []);

  const setRating = useCallback((workId: string, rating: number | undefined) => {
    setReadingList(prev => {
      return prev.map(i => {
        if (i.workId !== workId) return i;
        return { ...i, rating };
      });
    });
  }, []);

  const getStats = useCallback(() => {
    const wantToRead = readingList.filter(i => i.status === 'want-to-read').length;
    const currentlyReading = readingList.filter(i => i.status === 'currently-reading').length;
    const finished = readingList.filter(i => i.status === 'finished').length;
    return { wantToRead, currentlyReading, finished, total: readingList.length };
  }, [readingList]);

  const getListByStatus = useCallback((status: ReadingStatus) => {
    return readingList.filter(i => i.status === status);
  }, [readingList]);

  return {
    readingList,
    isLoaded,
    getStatus,
    getItem,
    setStatus,
    setRating,
    getStats,
    getListByStatus
  };
}
