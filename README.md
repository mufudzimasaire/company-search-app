# Company Search App

This is a simple Angular 17 application for searching company information, styled with Bootstrap. The app allows users to search for companies, view detailed information, and see lists of company officers.

## Screenshots

### 1. Search Page
![Search Page](https://github.com/user-attachments/assets/b8ea19dd-11b3-4b51-a4fd-ff53b98a5ded)

### 2. Search Results Page
![Results Page](https://github.com/user-attachments/assets/23219116-10d6-4bbd-9cd0-650a426d94e2)

### 3. Company Details Page
![Company details page](https://github.com/user-attachments/assets/afda8d96-6d5e-4888-9d22-a3551b5e4041)

### 4. Company Officers Page
![Company officers page](https://github.com/user-attachments/assets/57496453-a8ac-4405-8413-5612917c47a7)

## Features

- **Search for Companies**: Enter a company name or number to search.
- **Detailed Company Information**: View additional details for a selected company, including its address and status.
- **Officers List**: See a list of officers associated with each company.

## Getting Started

### Prerequisites

To run this application, ensure you have the following installed:

- **Node.js** (>= 18.x)
- **Angular CLI** (>= 17.x)

### Installation

1. **Clone the Repository**

   ```bash
    git clone git@github.com:mufudzimasaire/company-search-app.git
    cd company-search-app
   ```

2. **Install Dependencies**
   ```bash
    npm install
   ```

3. **Set up Environment Variables**
  Create a .env file in the root directory with the following content:

   ```bash
    NG_APP_API_KEY=your_api_key_here  
   ```
   Replace `your_api_key_here` with your actual API key for accessing the company data service.

4. **Run the Application**
   ```bash
    ng serve
   ```
   Navigate to `http://localhost:4200/`

5. *Running unit tests**
   ```bash
     ng test
   ```

### Additional Information
**Testing Mock Authentication**: To test the mock authentication in the app, adjust the `isAuthenticated` variable in the `authGuard` from `true` to `false` in the `auth.guard.ts` file. Perform a search and you will be redirected to the home page when you attempt viewing protected pages. An alert will also be displayed to inform you that you are not authenticated.

https://github.com/user-attachments/assets/8f3d7cf7-f127-4d96-899a-fa39a9ff4377

### TODO List
- Add pagination to the search results page.
