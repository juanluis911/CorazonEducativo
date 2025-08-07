// src/hooks/useInfiniteScroll.js
export const useInfiniteScroll = (loadMore, threshold = 200) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const handleScroll = mobileUtils.throttle(() => {
      if (
        window.innerHeight + window.scrollY >= 
        document.documentElement.offsetHeight - threshold &&
        !isLoading &&
        hasMore
      ) {
        setIsLoading(true);
        loadMore()
          .then((hasMoreData) => {
            setHasMore(hasMoreData !== false);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore, isLoading, hasMore, threshold]);

  return { isLoading, hasMore, setHasMore };
};