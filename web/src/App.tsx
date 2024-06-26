import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import ExpenseReport from "./features/expenseReport/ExpenseReport";
import SideNav from "./features/expenseReport/components/sideNav/SideNav";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <SideNav />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={<h1>Welcome to My Expense Report App</h1>}
            />
            <Route path="/expense-report" element={<ExpenseReport />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
