const sleep = async (timeout) => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
};

export default sleep;
