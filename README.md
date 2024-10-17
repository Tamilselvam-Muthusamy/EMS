# Employee Management System

This Employee Management System is a web application built using React, TypeScript, HTML, and CSS. It serves as a leave management portal where employees can apply for leave and permissions, and department leads can review and approve these requests. The system is designed to streamline the leave management process, making it easy for HR and management to track employee leave and permissions.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Employee Role](#employee-role)
- [Department Lead Role](#department-lead-role)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)

## Features
- **Employee Role**:
  - Apply for leave and permissions through a user-friendly interface.
  - Track the status of leave requests (pending, approved, or denied).
  - View remaining leave balances.

- **Department Lead Role**:
  - Review and approve or deny leave and permission requests.
  - Manage leave records for employees within the department.

- **Centralized Tracking**:
  - Real-time tracking of leave requests and remaining balances.
  - Centralized data for HR and management to efficiently manage employee leave records.

- **Responsive Design**:
  - Designed with modern web standards to ensure usability across different devices.

## Installation
To run this project locally:

1. Clone the repository:
    ```bash
    git clone git@github.com:Tamilselvam-Muthusamy/EMS.git
    ```

2. Navigate into the project directory:
    ```bash
    cd employee-management-system
    ```

3. Install dependencies:
    ```bash
    npm install
    ```
       or
    ```bash
    bun install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```
       or
    ```bash
    bun run dev
    ```

## Usage

1. **Employee**: Log in to the portal to apply for leave and permissions. Monitor the status of requests and check leave balances.
2. **Department Lead**: Log in to manage and review leave requests. Approve or reject employee leave applications.

## Employee Role

- Employees can perform the following actions:
  - Apply for leave by selecting a date range and specifying the reason.
  - Request permission for partial-day absences.
  - Track the approval status of requests and view leave history.

## Department Lead Role

- Department leads can:
  - Review all leave and permission requests submitted by employees within the department.
  - Approve or deny leave requests based on organizational policies.
  - View and manage leave balances for each employee.

## Screenshots
### Employee Dashboard
![Employee Dashboard Screenshot](https://github.com/user-attachments/assets/employee-dashboard.png)

### Apply for Leave
![Apply for Leave Screenshot](https://github.com/user-attachments/assets/apply-leave.png)

### Leave Request Status
![Leave Request Status Screenshot](https://github.com/user-attachments/assets/leave-status.png)

### Department Lead Dashboard
![Department Lead Dashboard Screenshot](https://github.com/user-attachments/assets/lead-dashboard.png)

### Review Leave Requests
![Review Leave Requests Screenshot](https://github.com/user-attachments/assets/review-requests.png)

## Technologies Used
- **React**: For building the user interface.
- **TypeScript**: For type safety and enhanced code quality.
- **HTML and CSS**: For structuring and styling the application.
- **React Router**: For navigation between pages.
