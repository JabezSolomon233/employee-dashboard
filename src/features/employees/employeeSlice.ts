import { createSlice } from "@reduxjs/toolkit"; // ✅ only import runtime exports

// Import type separately
import type { PayloadAction } from "@reduxjs/toolkit";

// Employee interface
interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  phone: string;
  joining_date: string;
  fax: string;
}

// Slice state interface
interface EmployeeState {
  list: Employee[];
  loading: boolean;
  error: string | null;
}

// Initial state with mock data
const initialState: EmployeeState = {
  list: [
    { id: 1, first_name: "John", last_name: "Doe", role: "Manager", email: "john@example.com", phone: "1234567890", joining_date: "2025-12-01", fax: "" },
    { id: 2, first_name: "Jane", last_name: "Smith", role: "Developer", email: "jane@example.com", phone: "0987654321", joining_date: "2025-12-02", fax: "" },
    { id: 3, first_name: "Mike", last_name: "Johnson", role: "", email: "mike@example.com", phone: "1112223333", joining_date: "2025-12-03", fax: "" },
  ],
  loading: false,
  error: null,
};

// Create slice
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.list.push(action.payload);
    },
    removeEmployee: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(emp => emp.id !== action.payload);
    },
  },
});

export const { addEmployee, removeEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
