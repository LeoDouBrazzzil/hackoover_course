import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {setAccessTokenGetter} from "apî/api.ts";

interface Props {
    children: React.ReactNode;
}

export const authTokenProvider = ({ children }: Props) => {
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        setAccessTokenGetter(() => getAccessTokenSilently());
    }, [getAccessTokenSilently]);

    return <>{children}</>;
};
