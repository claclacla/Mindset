import { useDispatch } from "react-redux";

import { unsetTrainingSessions } from "@/app/repositories/redux/trainingSessions/slice";
import { unsetKey } from "@/app/repositories/redux/authentication/slice";

export default function useLogout() {
    const dispatch = useDispatch();

    async function logout() {
        dispatch(unsetKey());
        dispatch(unsetTrainingSessions());
    }

    return {
        logout
    }
}