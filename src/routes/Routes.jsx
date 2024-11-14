import { createBrowserRouter } from "react-router-dom";
import LoginHomeLayout from "../layout/LoginHomeLayout";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../layout/DashboardLayout";
import AdminDashboardHome from "../pages/dashboardPages/DashboardAdminHome";
import RegisterPage from "../pages/RegisterPage";
import AllUsers from "../pages/dashboardPages/AllUsers";
import Profile from "../pages/dashboardPages/Profile";
import Messages from "../pages/dashboardPages/Messages";
import CreateMessage from "../pages/dashboardPages/CreateMessages";
import MessageDetails from "../pages/dashboardPages/MessageDetails";
import CodeWiseBudget from "../pages/dashboardPages/CodeWiseBudget";
import BudgetDistribution from "../pages/dashboardPages/BudgetDistribution";
import AddExpense from "../pages/dashboardPages/AddExpense";
import AddUpazila from "../pages/dashboardPages/AddUpazila";
import UpazilaDetails from "../pages/dashboardPages/UpazilaDetails";
import AllocatedCodewiseBudget from "../pages/dashboardPages/AllocatedCodewiseBudget";
import CodewiseDistributedBudgetToAllUpazila from "../pages/dashboardPages/CodewiseDistributedBudgetToAllUpazila";
import AllUpazilaList from "../pages/dashboardPages/AllUpazilaList";
import AddEconomicCode from "../pages/dashboardPages/AddEconomicCode";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginHomeLayout />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <AdminDashboardHome />,
      },
      {
        path: "adminDashboardHome",
        element: <AdminDashboardHome />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      { path: "addUpazila", element: <AddUpazila /> },
      {
        path: "allUsers",
        element: <AllUsers />,
      },
      {
        path: "addNewUser",
        element: <RegisterPage />,
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
        element: <AllUpazilaList />,
      },
      {
        path: "allUpazilas",
        element: <CodewiseDistributedBudgetToAllUpazila />,
      },
      {
        path: "upazila/:fieldOfficeCode",
        element: <UpazilaDetails />,
      },
      {
        path: "addEconomicField",
        element: <AddEconomicCode />,
      },
      {
        path: "budgetDistribution",
        element: <BudgetDistribution />,
      },
      {
        path: "addExpense",
        element: <AddExpense />,
      },
      {
        path: "allocatedCodeWiseBudget",
        element: <AllocatedCodewiseBudget />,
      },
    ],
  },
]);

export default router;
