import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../http";

export const fetchCompanyInfo = createAsyncThunk(
  "api/fetchCompanyInfo",
  async () => {
    try {
      const response = await $api.get("/company/info");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCompanyCreate = createAsyncThunk(
  "api/fetchCompanyCreate",
  async ({ name, info }) => {
    try {
      const response = await $api.post("/company/create", {
        name,
        info,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUpdateCompany = createAsyncThunk(
  "api/fetchUpdateCompany",
  async ({ companyId, name, info }) => {
    try {
      const response = await $api.put(`/company/update/${companyId}`, {
        name,
        info,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchDeleteCompany = createAsyncThunk(
  "api/fetchDeleteCompany",
  async (companyId) => {
    try {
      const response = await $api.delete(`/company/delete/${companyId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    status: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyInfo.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.companies = action.payload.companies;
        state.isLoading = false;
      })
      .addCase(fetchCompanyInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchCompanyCreate.fulfilled, (state, action) => {
        state.companies.push(action.payload.company);
      })
      .addCase(fetchUpdateCompany.fulfilled, (state, action) => {
        const updatedCompany = action.payload.company;
        const existingCompanyIndex = state.companies.findIndex(
          (company) => company.id === updatedCompany.id
        );
        if (existingCompanyIndex !== -1) {
          state.companies[existingCompanyIndex] = updatedCompany;
        }
      })
      .addCase(fetchDeleteCompany.fulfilled, (state, action) => {
        const deletedCompanyId = action.payload?.company?.id;
        if (deletedCompanyId) {
          state.companies = state.companies.filter(
            (company) => company.id !== deletedCompanyId
          );
        }
      });
  },
});

export default companySlice.reducer;
