import { IncomingMessage } from "http";

interface SessionResponse {
    user: Auth.Session;
}

export const getSession = async (req?: IncomingMessage) => {
    return fetchData<SessionResponse>("auth/session", req);
};

export const sessionLogin = (token: string): Promise<SessionResponse> => {
    const ssr = typeof window === "undefined";
    const baseUrl = ssr ? _appBaseUrl() : "";
    return fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
    }).then(res => res.json());
};

export const fetchData = async <T>(path: string, req?: IncomingMessage): Promise<T | null> => {
    try {
        const ssr = typeof window === "undefined";
        const baseUrl = ssr ? _appBaseUrl() : "";
        const options = req ? { headers: { cookie: req.headers.cookie || "" } } : {};
        const res = await fetch(`${baseUrl}/api/${path}`, options);
        if (res.status !== 200) return null;
        const data = await res.json();
        return Object.keys(data).length > 0 ? data : null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const _appBaseUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_APP_URL environment variable not set");
    }

    return baseUrl;
};
