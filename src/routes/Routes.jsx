import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../layout/DashboardLayout";
import RegisterPage from "../pages/RegisterPage";
import AllUsers from "../pages/dashboardPages/AllUsers";
import Profile from "../pages/dashboardPages/Profile";
import Messages from "../pages/dashboardPages/Messages";
import CreateMessage from "../pages/dashboardPages/CreateMessages";
import MessageDetails from "../pages/dashboardPages/MessageDetails";
import CodeWiseBudget from "../pages/dashboardPages/CodeWiseBudget";
import AllUpazilas from "../pages/dashboardPages/AllUpazilas";
import AddEconomicField from "../pages/dashboardPages/AddEconomicField";
import BudgetDistribution from "../pages/dashboardPages/BudgetDistribution";
import AddExpense from "../pages/dashboardPages/AddExpense";
import AddUpazila from "../pages/dashboardPages/AddUpazila";
import UpazilaAllList from "../pages/dashboardPages/UpazilaAllList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Profile />,
      },
      { path: "addUpazila", element: <AddUpazila /> },
      {
        path: "allUsers",
        element: <AllUsers />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "messages/:id",
        element: <MessageDetails />,
      },
      {
        path: "createMessage",
        element: <CreateMessage />,
      },
      {
        path: "codeWiseBudget",
        element: <CodeWiseBudget />,
      },
      {
        path: "upazilaAllList",
        element: <UpazilaAllList />,
      },
      {
        path: "allUpazilas",
        element: <AllUpazilas />,
      },
      {
        path: "addEconomicField",
        element: <AddEconomicField />,
      },
      {
        path: "budgetDistribution",
        element: <BudgetDistribution />,
      },
      {
        path: "addExpense",
        element: <AddExpense />,
      },
    ],
  },
]);

export default router;
