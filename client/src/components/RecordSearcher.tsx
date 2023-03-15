import { useContext, useState } from "react";
import {
  PricingRecordsContext,
  PricingRecordsContextValue
} from "../PricingRecordsContext";

export const RecordSearcher = () => {
  const { searchPricingRecords } = useContext(
    PricingRecordsContext
  ) as PricingRecordsContextValue;
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    searchPricingRecords(searchTerm);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h5> Search Record</h5>
      <form className="pricing-record-form search-form" onSubmit={handleSearch}>
        <input type="text" placeholder="Search record by storeId" value={searchTerm} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
