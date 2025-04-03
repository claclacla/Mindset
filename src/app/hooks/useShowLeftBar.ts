import { useState } from "react";

export default function useShowLeftBar({ isMobile }: { isMobile: boolean }) {
    const [showLeftBar, setShowLeftBar] = useState<boolean>(!isMobile);

    const toggleShowLeftBar = () => {
        setShowLeftBar(!showLeftBar);
    };

    return {
        showLeftBar,
        toggleShowLeftBar
    }
}