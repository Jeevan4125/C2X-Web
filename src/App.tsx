import { AppProviders } from "./app/providers";
import { AppRouter } from "./app/router";

function App(): React.ReactElement {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
