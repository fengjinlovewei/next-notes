type Data = {
  postMessage: <T>(value: any) => Promise<T>;
};

const cache: Record<string, Data> = {};

/**
 *
 * @param url
 * @returns
 */
export function workerPromise(url: string) {
  // const currentCache = cache[url];
  // if (currentCache) {
  //   return currentCache;
  // }
  const worker = new window.Worker(url);
  const data: Data = {
    postMessage: <T>(value: any) => {
      worker.postMessage(value);

      return new Promise<T>((resolve, reject) => {
        worker.onmessage = (res) => {
          console.log('worker.onmessage', res);
          resolve(res.data);
        };

        worker.onerror = reject;
      }).finally(() => {
        worker.terminate();
      });
    },
  };

  // cache[url] = data;

  return data;
}
