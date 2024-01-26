import { useEffect } from "react";

import WelcomeView from "./components/views/WelcomeView";
import GalleryView from "./components/views/GalleryView";
import EditProjectView from "./components/views/EditProjectView";
import { useProjects } from "./contexts/ProjectsContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
  const { dispatch, isLoggedIn, isEditProjectView } = useProjects();

  useEffect(
    function () {
      fetch("http://localhost:9000/projects")
        .then((res) => res.json())
        .then((data) => dispatch({ type: "dataReceived", payload: data }))
        .catch((err) => dispatch({ type: "dataFailed", payload: err }));
    },
    [dispatch]
  );

  return (
    <div className="app">
      {!isLoggedIn && <WelcomeView />}

      {isLoggedIn && (
        <>
          <Header />
          <Main>
            {!isEditProjectView && <GalleryView />}
            {isEditProjectView && <EditProjectView />}
          </Main>

          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
