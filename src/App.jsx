import WelcomeView from "./components/views/WelcomeView";
import GalleryView from "./components/views/GalleryView";
import EditProjectView from "./components/views/EditProjectView";
import { useProjects } from "./contexts/ProjectsContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import AddProjectView from "./components/views/AddProjectView";
import FavouredProject from "./components/FavouredProject";

function App() {
  const { activeView, favouredProjectId } = useProjects();

  return (
    <div className="app">
      {activeView === "welcome" && <WelcomeView />}

      {activeView !== "welcome" && (
        <>
          <Header />
          <Main>
            {activeView === "gallery" && (
              <>
                {favouredProjectId && <FavouredProject />}
                <GalleryView />
              </>
            )}
            {activeView === "edit-project" && <EditProjectView />}
            {activeView === "add-project" && <AddProjectView />}
          </Main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
