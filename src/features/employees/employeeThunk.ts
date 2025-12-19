import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";
import type { Employee } from "./employeeTypes";

export const fetchEmployees = createAsyncThunk(
  "employees/fetch",
  async () => {
    const res = await api.get<Employee[]>("/employees");
    return res.data;
  }
);

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (data: Omit<Employee, "id">) => {
    const res = await api.post<Employee>("/employees", data);
    return res.data;
  }
);
