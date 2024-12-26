import { ImageSourcePropType } from "react-native"
type LocaleContent = {
    key: string;
    title: string;
    text: any; // Adjust if your JSON has a more specific structure
    image: ImageSourcePropType;
  };

  type LocalesType = {
    [key: string]: LocaleContent;
  };

export const langs:LocalesType={
    en:{
        key:"en",
        title:"English",
        text: require("./en.json"),
        image:require("../assets/flags/en.png")
    },
    it:{
        key:"it",
        title:"Italiano",
        text: require("./it.json"),
        image:require("../assets/flags/it.png")
    },
}