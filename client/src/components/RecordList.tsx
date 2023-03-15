import React, { useContext } from "react";
import {
  PricingRecordsContext,
  PricingRecordsContextValue
} from "../PricingRecordsContext";

export const RecordList = () => {
  const { records, searchResults, setEditingRecord, deletePricingRecord } = useContext(
    PricingRecordsContext
  ) as PricingRecordsContextValue;

  return (
    <table className="pricing-record-table">
      <thead>
        <tr>
          <th>Store ID</th>
          <th>SKU</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {(searchResults || records).map((record) => (
          <tr key={record.id}>
            <td>{record.storeID}</td>
            <td>{record.SKU}</td>
            <td>{record.productName}</td>
            <td>{record.price}</td>
            <td>{record.date}</td>
            <td>
              <button onClick={() => setEditingRecord(record)}>Edit</button>
              <button onClick={() => deletePricingRecord(record)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
