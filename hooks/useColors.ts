import { useThemeStore } from "@/store/themeStore";
import { Colors } from "@/constants/Colors";

export const useColors=()=>{
    const theme=useThemeStore((state)=>state.theme)
    return Colors[theme || 'light'];
}