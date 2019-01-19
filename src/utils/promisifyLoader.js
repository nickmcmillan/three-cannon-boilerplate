export const promisifyLoader = function (loader, onProgress, onError) {
  function promiseLoader(url) {

    return new Promise((resolve, reject) => {
      loader.load(url, resolve, onProgress, onError)
    })
  }

  return {
    originalLoader: loader,
    load: promiseLoader,
  }
}