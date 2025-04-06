import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from '@/app/context/authContext';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function checkIfUserLoggedIn() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
            if (firebaseUser && isMounted) {
                setUser(firebaseUser);
            } else {
                if (isMounted) {
                    router.push('/');
                }
            }
        });

        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, [router]);

    return {
        user
    }
}