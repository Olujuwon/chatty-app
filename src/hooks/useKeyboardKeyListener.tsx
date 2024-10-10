import { useEffect } from "react";

interface UseKeyboardShortcutArgs {
    key: string
    onKeyPressed: () => void;
}

const useKeyboardShortcut = ({key, onKeyPressed}:UseKeyboardShortcutArgs)=>{
    useEffect(() => {
        document.addEventListener("keydown", (event: KeyboardEvent)=>{
            if (event.key===key){
                event.preventDefault();
                onKeyPressed();
            }
        });
        return ()=>document.removeEventListener("keydown", ()=>{})
    }, []);
}

export default useKeyboardShortcut;