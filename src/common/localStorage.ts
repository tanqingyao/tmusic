export function saveSongs(songs: ISong[]) {
  localStorage.setItem("songs_key", JSON.stringify(songs));
}

export function readSongs(): ISong[] {
  return JSON.parse(localStorage.getItem("songs_key") || "[]");
}

export function clearAllSongs() {
  localStorage.clear();
}
