export const sleep = (time = 2000) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      console.log("fetch succeeded");
      res(true);
    }, time);
  });
