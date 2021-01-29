type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};
declare type Actions = {
  [ActionTypes.SetPlaying](context: ActionAugments, value: boolean): void;
  [ActionTypes.AddPlayList](context: ActionAugments, ids: number[]): void;
  [ActionTypes.SwitchByOrder](context: ActionAugments, mode: string): void;
  [ActionTypes.SwitchByShuffle](context: ActionAugments, mode: string): void;
};
