# Pricing Record Web Application

This is a web application for managing pricing records for retail stores. It allows users to upload and persist pricing feeds from retail stores using CSV files which contain Store ID, SKU, Product Name, Price, and Date. Users can also search for pricing records using various criteria and edit/save changes to any record.

Screenshots:
![alt text](https://github.com/niteshBhardwaj/pricing-records-app/blob/main/screenshots.gif "Screenshots")

## Getting Started

To get started with the application, follow the steps below:

Clone the repository to your local machine using git clone.
Navigate to the client directory and run npm install to install the front-end dependencies.
Navigate to the server directory and run npm install to install the back-end dependencies.
Run npm run dev in the server directory to start the server and the client together.

## Architecture

The application is divided into two main components: the client-side and the server-side. The client-side is built with React.js, while the server-side is built with Node.js and Express.js. The two components communicate with each other using RESTful API calls.

### Tech Stack

The application uses the following technologies:

* React.js with Typescript for the front-end
* Node.js with TypeScript for the back-end
* Express.js as the web framework for the back-end
* MongoDB for data persistence (currently used in-memory object storage)
* CSS for styling

### Features

The application has the following features:

### Upload Pricing Records

Users can upload pricing records in CSV format using the FileUploader component.

### View Pricing Records

Users can view all pricing records in a tabular format in the PricingRecordTable component. The table is sortable by clicking on the column headers. Users can also edit and delete pricing records from the table.

### Search Pricing Records

Users can search for pricing records using various criteria such as store ID, SKU, product name, and date range. The search results are displayed in the PricingRecordTable component.

### Non-Functional Requirements:

1. Scalability: The application should be able to handle 3000 stores across multiple countries and accommodate large amounts of data.
2. Security: The application must have proper security measures to prevent unauthorized access and ensure data privacy.
3. Performance: The application must be responsive and perform efficiently to minimize user wait times.
4. Availability: The application must be available 24/7 to ensure that users can access data when needed.

### Improvements

The following improvements can be made to the application:

1. Implement server-side pagination and filtering to improve performance with large datasets.
2. Integrate a proper database for data persistence instead of using in-memory storage.
3. Improve the styling of the application using a CSS framework such as Bootstrap, Tailwind, or StyleComponent.
4. Implement user authentication and authorization to restrict access to certain features.
5. Add error handling for various scenarios such as failed file uploads or server errors.

#### Conclusion

This application provides a basic implementation of pricing record management for retail stores. It can be extended and customized to meet specific requirements for a retail chain with 3000 stores across multiple countries.