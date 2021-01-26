export const collectSongUrl = res => {
  //   console.log(res);
  return res.data.data.map(item => {
    return {
      url: item.url
    };
  });
};
