import React, { createContext, useEffect, useState } from "react";
import { PricingRecord } from "./types";
import { httpDelete, httpGet, httpPost, httpPut } from "./utils/http";

export type PricingRecordsContextValue = {
  records: PricingRecord[];
  searchResults: PricingRecord[];
  editingRecord: PricingRecord | null;
  setEditingRecord: (record: PricingRecord | null) => void;
  fetchPricingRecords: () => Promise<void>;
  searchPricingRecords: (searchTerm: string) => void;
  savePricingRecord: (record: PricingRecord) => Promise<void>;
  deletePricingRecord: (record: PricingRecord) => Promise<void>;
  uploadPricingRecords: (file: File) => Promise<void>;
};

export const PricingRecordsContext = createContext<
  PricingRecordsContextValue | undefined
>(undefined);

type PricingRecordsProviderProps = {
  children: React.ReactNode;
};

export const PricingRecordsProvider = ({
  children
}: PricingRecordsProviderProps) => {
  const [records, setRecords] = useState<PricingRecord[]>([]);
  const [searchResults, setSearchResults] = useState<PricingRecord[]>([]);
  const [editingRecord, setEditingRecord] = useState<PricingRecord | null>(
    null
  );

  const fetchPricingRecords = async () => {
    try {
      const response = await httpGet("/pricing-records");
      if (response.ok) {
        const data = await response.json();
        setRecords(data);
        setSearchResults(data);
      } else {
        console.error("Fetch failed");
      }
    } catch (error) {
      console.error("fetch error", error);
    }
  };

  useEffect(() => {
    fetchPricingRecords();
  }, []);

  const searchPricingRecords = (searchTerm: string) => {
    setSearchResults(
      records.filter(
        (record) =>
          record.storeID.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.SKU.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.productName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const savePricingRecord = async (record: PricingRecord) => {
    try {
      const response = await httpPut(`/pricing-records/${record.storeID}`, {
        body: JSON.stringify(record)
      });
      if (response.ok) {
        setRecords(
          records.map((r) => (r.storeID === record.storeID ? record : r))
        );
        setSearchResults(
          searchResults.map((r) => (r.storeID === record.storeID ? record : r))
        );
      } else {
        console.error("Save failed");
      }
    } catch (error) {
      console.error(error);
    }
    setEditingRecord(null);
  };

  const deletePricingRecord = async (record: PricingRecord) => {
    try {
      const response = await httpDelete(`/pricing-records/${record.storeID}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setRecords(records.filter((r) => r.storeID !== record.storeID));
        setSearchResults(
          searchResults.filter((r) => r.storeID !== record.storeID)
        );
        setEditingRecord(null);
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadPricingRecords = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await httpPost("/pricing-records/upload", {
        body: formData
      });
      if (response.ok) {
        fetchPricingRecords();
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PricingRecordsContext.Provider
      value={{
        records,
        searchResults,
        editingRecord,
        setEditingRecord,
        fetchPricingRecords,
        searchPricingRecords,
        savePricingRecord,
        deletePricingRecord,
        uploadPricingRecords
      }}
    >
      {children}
    </PricingRecordsContext.Provider>
  );
};
