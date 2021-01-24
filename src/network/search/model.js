export const collectSearchDefault = res => {
  const { realkeyword: real, showKeyword: show } = res.data.data;
  return {
    real,
    show
  };
};
export const collectSearchSuggest = res => {
  const suggests = res.data.result.allMatch.map(suggest => {
    return {
      key: suggest.keyword
    };
  });
  return suggests;
};

export const collectSearchHot = res => {
  const hots = res.data.data.map(suggest => {
    return {
      score: suggest.score,
      key: suggest.searchWord,
      iconL: suggest.iconUrl
    };
  });
  return hots;
};

export const collectSearchCloud = res => {
  const songs = res.data.result.songs.map(song => {
    return {
      name: song.name,
      album: song.al.name,
      mv: song.mv
    };
  });
  return songs;
};
