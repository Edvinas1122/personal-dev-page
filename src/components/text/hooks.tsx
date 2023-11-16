import {
	useMantineTheme,
	MantineTheme,
	MantineComponent,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';

type ThemeKey = keyof MantineTheme;
type MantineComponentProp = keyof MantineComponent<any>;

type ComponentThemeUse = {
	toSet: MantineComponentProp;
	setting: ThemeKey;
  }
  
const withMantineTheme = (
	Component: MantineComponent<any>,
	themeKeys: ComponentThemeUse[] = [],
) => {
	const ThemedComponent = (
		props: {[key: MantineComponentProp]: any}
	) => {
		const theme = useMantineTheme();
	
		const themeProps = themeKeys
			.reduce((acc, { toSet, setting }: ComponentThemeUse) => {
				acc[toSet] = theme[setting as keyof MantineTheme];
				return acc;
			}, {} as {[key: MantineComponentProp]: any});
	
		return <Component {...themeProps} {...props} />;
	}
	return ThemedComponent;
}

export { withMantineTheme };
