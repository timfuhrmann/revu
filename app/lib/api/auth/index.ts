export const signOut = async () => {
    return fetch("/api/auth/logout");
};
