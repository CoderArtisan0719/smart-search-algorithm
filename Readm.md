# Smart Entity Extractor

The Smart Entity Extractor is a full-stack application designed to dynamically recognize and extract entities such as cities, brands, dish types, and diets from a given search term. The application is architected with a Node.js backend utilizing Express and Sequelize to interact with a PostgreSQL database. Although a UI is not implemented for this task, the backend is fully functional and can be tested with API tools like Postman.

## Project Overview

This project implements a smart search algorithm that parses a search term and extracts relevant entities based on predefined categories stored in a PostgreSQL database. Each entity type (cities, brands, dish types, diets) is stored in separate tables, and the application dynamically generates search patterns to identify these entities within search terms.

## Features

- **Dynamic Entity Recognition**: Extracts entities based on dynamically generated search patterns.
- **Database-Driven**: Utilizes PostgreSQL to store entity data and Sequelize for ORM.
- **Optimized Query Performance**: Designed to perform single database queries to minimize load times and resource usage.
- **Modular Architecture**: Backend code is modular and well-documented to allow easy maintenance and scalability.

## File and Folder Structure

Below is a high-level overview of the important files and folders in this project:
```plaintext
/entity-extractor/
│
backend
├── .sequelizerc
├── package-lock.json
├── package.json
├── src
│   ├── config
│   │   └── config.json
│   ├── data
│   │   ├── brands-v2.xlsx
│   │   ├── cities-v2.xlsx
│   │   ├── diets-v2.xlsx
│   │   └── dish-types-v2.xlsx
│   ├── migrations
│   │   ├── 20240705085638-create-city.js
│   │   ├── 20240705085728-create-brand.js
│   │   ├── 20240705085731-create-dish-type.js
│   │   └── 20240705085733-create-diet.js
│   ├── models
│   │   ├── brand.ts
│   │   ├── city.ts
│   │   ├── diet.ts
│   │   ├── dishtype.ts
│   │   └── index.ts
│   ├── seed.ts
│   ├── server.ts
│   └── utils
│       ├── dataConfig.ts
│       └── seedHelpers.ts
└── tsconfig.json
├── frontend/                              
│   ├── public/                            
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/                              
│   │   ├── App.css                        
│   │   ├── App.test.tsx                   
│   │   ├── App.tsx                        
│   │   ├── index.css                     
│   │   ├── index.tsx                      
│   │   ├── logo.svg                       
│   │   ├── react-app-env.d.ts             
│   │   ├── reportWebVitals.ts             
│   ├── README.md                          
│   ├── package.json                       
│   ├── package-lock.json
│   └── tsconfig.json                     
│
├── README.md                              
└── .gitignore 
```

## Getting Started

These instructions will guide you on how to get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (comes with Node.js)
- PostgreSQL

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourgithubusername/entity-extractor.git
   cd entity-extractor
2. **Clone the Repository**

    Navigate to the backend directory, install dependencies, and set up the database.
    ```bash
    cd backend
    npm install
    # Configure your database connection details in config/config.json
    npx sequelize db:migrate
    npx sequelize db:seed:all
    npx ts-node src/seed.ts

3. **Start the backend Server**
    ```
    npm start
    ```
    This will start the server at http://localhost:3001, handling API requests for entity extraction.

4. **Setup the Frontend**

    Open another terminal, navigate to the frontend directory, and install dependencies.
    ```
    cd ../frontend
    npm install
    npm start
    ```
    This will start the React development server and open http://localhost:3000 in your browser.

## Usage

To use the application, send a GET request to http://localhost:3001/extractEntities with a searchTerm query parameter. For example:

```
GET http://localhost:3001/extractEntities?searchTerm=vegan%20sushi%20in%20London
```
This endpoint will return an array of objects, each representing possible combinations of identified entities within the search term

## Examples

1. **Single Entity**:
- Search Term: **McDonald's**
- Result:
```
[{ 
  "brand": {"id": 4, "name": "McDonald's"}
}]
```
2. **Multiple Entities:**:
- Search Term: **McDonald's in London**
- Result:
```
[{ 
  "city": {"id": 1, "name": "London"},
  "brand": {"id": 4, "name": "McDonald's"}
}]
```
3. **Complex Case:**:
- Search Term: **Vegan Sushi in London**
- Result:
```
[{ 
  "city": {"id": 1, "name": "London"},
  "diet": {"id": 1, "name": "Vegan"},
  "dishType": {"id": 72, "name": "Sushi"}
},
{ 
  "city": {"id": 1, "name": "London"},
  "diet": {"id": 1, "name": "Vegan"},
  "brand": {"id": 15, "name": "Sushimania"}
}]
```

## Video Demonstration
Watch the working process of the project setup and functionality demonstration in the following Loom video:

[Loom Video](https://www.loom.com/share/5cde4918a9cf461b90fec1b78cf7402c?sid=36ada059-e85b-49ab-80fa-0609045f0569)