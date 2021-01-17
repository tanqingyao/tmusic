export default {
  listLength: state => {
    return state.playList.length;
  },
  currentSongIndex: state => {
    return state.playList.findIndex(item => item.id === state.currentSong.id);
  },
  // 返回函数进行传参,不会缓存
  getSongById: state => id => {
    return state.playList.find(item => item.id === id);
  }
};
