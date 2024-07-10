# Receipt Processor

This project implements a web service for processing receipts and calculating points based on specific rules.

## Getting Started

### Prerequisites

- Node.js
- npm
- Docker (optional)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/AsthaModi/OA-fetch-process-receipt.git
    cd receipt-processor
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

You can run the application using Node.js or Docker.

#### Using Node.js

1. Start the server:
    ```sh
    npm run start-server
    ```

2. The server will run on `http://localhost:8080`.

#### Using Docker

1. Build the Docker image:
    ```sh
    npm run build
    ```

2. Start the Docker container:
    ```sh
    npm run start
    ```

3. The server will run on `http://localhost:8080`.

### API Endpoints

#### Process Receipts

- **URL**: `/receipts/process`
- **Method**: `POST`
- **Payload**: JSON receipt
- **Response**: JSON containing an ID for the receipt.

**Example Request**:
```sh
curl -d '{ 
  "retailer": "M&M Corner Market", 
  "purchaseDate": "2022-03-20", 
  "purchaseTime": "14:33", 
  "items": [ 
    { "shortDescription": "Gatorade", "price": "2.25" },
    { "shortDescription": "Gatorade", "price": "2.25" },
    { "shortDescription": "Gatorade", "price": "2.25" },
    { "shortDescription": "Gatorade", "price": "2.25" }
  ], 
  "total": "9.00" 
}' -H "Content-Type: application/json" -X POST http://localhost:8080/receipts/process
