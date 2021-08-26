declare module Filter {
    type State = 0 | 1 | 2;

    interface StorageState {
        state: State;
        customOrder: string[];
    }
}
