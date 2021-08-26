export const theme = {
    //region Color
    black: "#000",
    white: "#fff",
    primary: "#4D69FA",
    primaryAccent: "#A2C6FD",
    green: "#00ca4e",
    yellow: "#ffbd44",
    red: "#ff605c",
    //endregion

    //region Size
    formHeight: "4rem",
    //endregion

    //region Border
    radius: "0.5rem",
    //endregion

    //region Shadow
    shadowTile: "0 0.2rem 0.5rem rgba(0, 0, 0, 0.05)",
    //endregion

    //region Breakpoints
    bp: {
        m: "screen and (min-width: 768px)",
        l: "screen and (min-width: 1024px)",
        xl: "screen and (min-width: 1340px)",
        xxl: "screen and (min-width: 2000px)",
    },
    //endregion
};

export const light = {
    ...theme,

    //region Colors
    body: "#FFF",
    color: "#2C2C2C",

    gray50: "#FFF",
    gray75: "#FAFAFA",
    gray100: "#F5F5F5",
    gray200: "#EAEAEA",
    gray300: "#E1E1E1",
    gray400: "#CACACA",
    gray500: "#B3B3B3",
    gray600: "#8E8E8E",
    gray700: "#6E6E6E",
    gray800: "#4B4B4B",
    gray900: "#2C2C2C",

    orange400: "#FFE8D1",
    orange700: "#EA5906",

    red400: "#E34850",
    red500: "#D7373F",
    red600: "#C9252D",
    red700: "#BB121A",

    blue400: "#1F3140",
    blue500: "#193750",
    blue600: "#1E4260",
    blue700: "#2A5980",

    green400: "#2D9D78",
    green500: "#268E6C",
    green600: "#12805C",
    green700: "#107154",
    //endregion
};

export const dark = {
    ...theme,

    //region Colors
    body: "#080808",
    color: "#EFEFEF",

    gray50: "#080808",
    gray75: "#1A1A1A",
    gray100: "#1E1E1E",
    gray200: "#2C2C2C",
    gray300: "#393939",
    gray400: "#494949",
    gray500: "#5C5C5C",
    gray600: "#7C7C7C",
    gray700: "#A2A2A2",
    gray800: "#C8C8C8",
    gray900: "#EFEFEF",

    orange400: "#3C2618",
    orange700: "#EA5906",

    red400: "#D7373F",
    red500: "#E34850",
    red600: "#EC5B62",
    red700: "#F76D74",

    blue400: "#1F3140",
    blue500: "#193750",
    blue600: "#1E4260",
    blue700: "#2A5980",

    green400: "#268E6C",
    green500: "#2D9D78",
    green600: "#33AB84",
    green700: "#39B990",
    //endregion
};

type Theme = typeof light & typeof dark;

declare module "styled-components" {
    export interface DefaultTheme extends Theme {}
}
