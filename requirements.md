# Structured Requirement Specification for the Budget Distribution Management System (BDMS)

## System Overview
The system will have two primary roles:
- **Admin**: Manages economic codes, budgets, and users.
- **User**: Views and manages their assigned budgets.

---

## 1. Authentication
- **Login Page** to authenticate both Admin and User.
- After login, each role will be directed to their respective dashboard.

---

## 2. Admin Dashboard

### Sidebar Tabs:
1. **Code-wise Budget**
2. **All Upazilas**
3. **Add Economic Field**
4. **Budget Distribution**
5. **Add User**

### Main Functions:

#### Code-wise Budget
- Displays a table with fields:
  - **Economic Code**
  - **Code Name**
  - **Total Budget**
  - **Distributed Budget**
  - **Remaining Budget** (calculated as Total Budget - Distributed Budget)

#### All Upazilas
- Displays a large table with columns:
  - **Upazila ID**
  - **Upazila Name**
  - **Economic Codes**: Each economic code and distributed budget appear in respective fields.
- Admin can view and manage the budget distribution per upazila.

#### Add Economic Field
- Form to add a new economic field with fields:
  - **Economic Code**
  - **Code Name**
  - **Total Budget** (initially defined by admin)
  - **Distributed Budget** (starts at 0)

#### Budget Distribution
- Allows the admin to distribute budgets to various upazilas.
- Displays a form with fields:
  - **Upazila ID & Upazila Name**
  - **Economic Code & Code Name**
  - **Distributed Budget** (admin enters the amount per economic code)
- On submission:
  - The distributed budget per economic code is updated.
  - Calculations are performed:
    - **Distributed Budget** (sum of all distributions)
    - **Remaining Budget** (calculated per code)

#### Add User
- Form for the admin to create user accounts with fields:
  - **Unique ID**
  - **Password** (initial, changeable by the user)
  - **Upazila Code**
  - **Upazila Name**

---

## 3. User Dashboard

### Sidebar Tabs:
1. **Code-wise Budget**
2. **Add Expense**
3. **Profile Settings**

### Main Functions:

#### Code-wise Budget
- Displays a table with fields:
  - **Economic Code**
  - **Code Name**
  - **Distributed Budget** (assigned by Admin)
  - **Expense Budget** (initially 0)
  - **Non-Expense Budget** (calculated as Distributed Budget - Expense Budget)

#### Add Expense
- Allows the user to log expenses by economic code.
- Form with fields:
  - **Economic Code & Code Name** (dropdown to select)
  - **Expense Amount**
- On submission:
  - The selected economic code's Expense Budget is updated.
  - Non-Expense Budget is recalculated.

#### Profile Settings
- User can edit personal information:
  - **Name**
  - **Post Name**
  - **Joining Date**
  - **Password**

---

## 4. Calculations
- **Distributed Budget**: Updated on budget distribution by admin.
- **Remaining Budget**: Calculated as Total Budget - Distributed Budget.
- **Non-Expense Budget** (for Users): Calculated as Distributed Budget - Expense Budget.
