import { useLayoutEffect, useState } from "react";

/*

    Hook to keep the window size (width) after any window resize

*/

export const useWindowSize = () => {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }

        window.addEventListener('resize', updateSize);
        
        updateSize();
        
        return () => window.removeEventListener('resize', updateSize);
    }, []);
  return size;
}