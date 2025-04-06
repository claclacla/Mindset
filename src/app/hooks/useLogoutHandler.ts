import { useDispatch } from "react-redux";

import { useRouter } from 'next/navigation';

import { unsetTrainingSessions } from "@/app/repositories/redux/trainingSessions/slice";

export default function useLogoutHandler({ logout }: { logout: () => {}}) {
    const router = useRouter();
    const dispatch = useDispatch();

    async function logoutHandler() {
        try {
            await logout();

            dispatch(unsetTrainingSessions());
        } catch (err) {
            console.error(err);
        }

        router.push('/');
    }

    return {
        logoutHandler
    }
}