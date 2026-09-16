import AppRoutes from "./routes/routes";
import InstallPrompt from "./components/InstallPrompt";

const App = () => {
  return (
    <div>
      <AppRoutes />
      <InstallPrompt />
    </div>
  );
};

export default App;
