import { RecordList } from "./components/RecordList";
import { RecordSearcher } from "./components/RecordSearcher";
import { RecordEditor } from "./components/RecordEditor";
import { FileUploader } from "./components/FileUploader";
import { PricingRecordsProvider } from "./PricingRecordsContext";

const App: React.FC = () => {
  return (
    <PricingRecordsProvider>
      <div>
        <h1>Pricing Records</h1>
        <FileUploader />
        <RecordSearcher />
        <RecordEditor />
        <RecordList />
      </div>
    </PricingRecordsProvider>
  );
};

export default App;
