import { useState, useContext, useEffect } from "react";
import {
  PricingRecordsContext,
  PricingRecordsContextValue
} from "../PricingRecordsContext";
import { PricingRecord } from "../types";

const emptyFormState = (): PricingRecord => ({
  id: 0,
  storeID: "",
  SKU: "",
  productName: "",
  price: 0,
  date: ""
});
export const RecordEditor = () => {
  const { editingRecord, savePricingRecord } = useContext(
    PricingRecordsContext
  ) as PricingRecordsContextValue;
  const [formState, setFormState] = useState<PricingRecord>(emptyFormState);

  useEffect(() => {
    if (editingRecord) {
      setFormState({
        ...editingRecord
      });
    }
  }, [editingRecord]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const record = { ...formState } as PricingRecord;
    savePricingRecord(record);
    setFormState(emptyFormState());
  };

  if (!editingRecord) {
    return null;
  }

  return (
    <div className="pricing-record-form">
      <h2>Edit Pricing Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="storeId" className="form-label">
            Store ID
          </label>
          <input
            type="text"
            className="form-control"
            id="storeId"
            name="storeId"
            value={formState.storeID}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sku" className="form-label">
            SKU
          </label>
          <input
            type="text"
            className="form-control"
            id="sku"
            name="sku"
            value={formState.SKU}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="productName"
            value={formState.productName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="price"
            name="price"
            value={formState.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="text"
            className="form-control"
            id="date"
            name="date"
            value={formState.date}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};
