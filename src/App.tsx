import { Program } from "./components/Program";
import { OperationsManagementAndLogistics } from "./data/data";

function App() {
  return (
    <div className={"flex flex-col gap-5"}>
      <Program program={OperationsManagementAndLogistics} />
    </div>
  );
}

export default App;
