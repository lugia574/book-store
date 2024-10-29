import { useContext } from "react";
import { ThemeContext } from "../../context/ThemContext";

// interface Props {
//   themeName: ThemeName;
//   setThemeName: (ThemeName: ThemeName) => void;
// }

const ThemeSwitcher = () => {
  const { themeName, toggleTheme } = useContext(ThemeContext);
  return <button onClick={toggleTheme}>{themeName} 모드 변경</button>;
};

export default ThemeSwitcher;
