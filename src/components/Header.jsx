import ThemeSelector from "./ThemeSelector";

import User from "./User";
import Button from "./Button";
import HeaderIconsBox from "./HeaderIconsBox";

import { useProjects } from "../contexts/ProjectsContext";

function Header() {
  const { dispatch, isEditorMode } = useProjects();

  const onLogOut = () => {
    dispatch({ type: "logOut" });
  };

  return (
    <header className="flex">
      <h1>{isEditorMode ? "Editor Mode" : "Your Portfolio"}</h1>
      <div className="flex gap-8">
        <User />
        <HeaderIconsBox />
        <Button type="btn-info" text="Log out" handleClick={onLogOut} />
      </div>
      <ThemeSelector />
    </header>
  );
}

export default Header;
