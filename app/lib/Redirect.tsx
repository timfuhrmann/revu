import React, { useEffect } from "react";
import { useRouter } from "next/router";

interface RedirectProps {
    destination: string;
}

export const Redirect: React.FC<RedirectProps> = ({ destination }) => {
    const router = useRouter();

    useEffect(() => {
        router.replace(destination);
    }, []);

    return null;
};
