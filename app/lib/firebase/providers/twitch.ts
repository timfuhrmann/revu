export const config = {
    client: {
        id: process.env.TWITCH_CLIENT_ID || "",
        secret: process.env.TWITCH_CLIENT_SECRET || "",
    },
    host: "https://id.twitch.tv/oauth2/authorize",
    tokenHost: "https://id.twitch.tv/oauth2/token",
    userHost: "https://api.twitch.tv/helix/users",
    redirectUri: process.env.NEXT_PUBLIC_APP_URL + "/api/auth/callback/twitch",
    scope: "user_read",
};
