import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type themeStateType= {
    theme:'light' | 'dark',
};
type themeActionType={
    setTheme: (theme:themeStateType['theme'])=>Promise<void>
}

export const useThemeStore=create<themeStateType & themeActionType>()((set)=>{
    const hydrate = async () => {
        try {
          const savedTheme = await AsyncStorage.getItem('theme');
          if (savedTheme) {
            set({ theme: savedTheme as themeStateType['theme'] });
          }
        } catch (error) {
          console.error('Failed to load theme from AsyncStorage:', error);
        }
      };
      hydrate();
    return {
        theme:'light',
        setTheme:async (theme)=>{
            await AsyncStorage.setItem('theme',theme);
            set({theme});
        }
    }
})