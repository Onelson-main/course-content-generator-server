## Title

## Table of Contents
* [Background](#Background)
* [Features](#Features)
* [Installation and Setup](#Installation-and-Setup)
* [Usage](#Usage)
* [API Documentation](#API-Documentation)
* [License](#License)

## Background
This is a simple NodeJS server for an application that allows searching for details on courses. 
It utilizes Node.JS, Express, Supabase and Google Gemini
It was built as a requirement for the Ekatra job

## Features
An API for searching for courses from a database and generating course details using AI if not available.
Key capabilities
  * Search for a course
  * Get course details
  * Generation of new course details using AI

<!-- - Screenshots or diagrams to illustrate features -->

## Installation and Setup
- Prerequisites
  - Node.js 
  - Supabase account
  - Google Gemini API key
- Installation steps
  - Clone the repo 
  - Install dependencies using "npm install" or "yarn" command 
  - Create Supabase account, create "courses" table, get Supabase public key
  - Create Google Gemini account and get API key
  - Setup environment variables
    - GOOGLE_GEMINI_API_KEY
    - SUPABASE_KEY
- Run the server
  - Starting the server using "npm dev" locally 
  - Verify the server is running by visiting the root URL ( "/" ) of the server

## Usage
This API can be consumed via the react app or using postman to access the end points.
There is no bearer token involved.

## API Documentation
The following endpoints are available
  - / - This endpoint can be used to check if the server is live and responding.
  - /courses - This endpoint allows you to retrieve a list of all available courses.
  - /courses/:id - This endpoint allows you to retrieve details of a specific course by its unique identifier (ID).
  - /courses/search?q=course_title - This endpoint allows you to search for courses using it's title

- Detailed documentation
/

    URL: /
    HTTP Method: GET
    Description: This endpoint can be used to check if the server is live and responding.
    Parameters: None
    Responses:
        200 OK: The server is live and responding.
        500 Internal Server Error: There was an issue with the server.

/courses

    URL: /courses
    HTTP Method: GET
    Description: This endpoint allows you to retrieve a list of all available courses.
    Parameters: None
    Responses:
        200 OK: The list of courses.
        500 Internal Server Error: There was an issue with the server.



/courses/:id

    URL: /courses/:id
    HTTP Method: GET
    Description: This endpoint allows you to retrieve details of a specific course by its unique identifier (ID).
    Parameters:
        id (required, number): The unique identifier of the course.
    Responses:
        200 OK: The details of the course.
        404 Not Found: The course with the specified ID was not found.
        500 Internal Server Error: There was an issue with the server.


/courses/search

    URL: /courses/search
    HTTP Method: GET
    Description: This endpoint allows you to search for courses based on various criteria, such as course title, description, or tags.
    Parameters:
        q (required, string): The search query.
    Responses:
        200 OK: The details of the course matching the search query.
        400 Bad Request: Invalid request parameters (empty search query)
        500 Internal Server Error: There was an issue with the server.


## License
- The license the software is released under (e.g. MIT, Apache, etc.)