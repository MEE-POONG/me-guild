import { useRouter } from 'next/router';

const usePathChecker = () => {
  const router = useRouter();

  const getBasePath = () => {
    const { pathname, asPath } = router;

    // Split the pathname and asPath into arrays
    const pathnameArray = pathname.split('/').filter(Boolean);
    const asPathArray = asPath.split('/').filter(Boolean);

    // If the last part of the pathname is dynamic (e.g., [id]), ignore it and return the actual base path from asPath
    if (pathnameArray[pathnameArray.length - 1]?.startsWith('[')) {
      return `/${asPathArray.slice(0, asPathArray.length - 1).join('/')}`;
    }

    // Otherwise, return the full asPath
    return `/${asPathArray.join('/')}`;
  };

  return { getBasePath };
};

export default usePathChecker;