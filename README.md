# Time-Reporting-System-React

This is a simple project created as the part of my university course. It's main target was to get familiar with React framework and use it along with some backend API. 

## Overview

Created project is very simple and basic time reporting tool. Users report activities connected to projects. All data is being stored in relational DB.
Users can then view, edit and delete submitted activities. Finally, everything is presented in user-friendly boostrap GUI form.

## React front end

Front end part of the application is implemented with the usage of React framework. Implementation uses only functional components with hooks mechanism. 
The whole front end tries to minimize the data fetches from the backend. Operations such as add, edit and delete are performed locally, after 
correct backend response. The only moment, when data is being fetched, is when user changes the date of displayed activities.

## .NET backend

Backend provides simple API to get access to activities and projects. It uses EntityFramework to establish DB connection. API is organized in JSON format.

## Technologies

React, C#, .NET, EntityFramework, Bootstrap.

## Side notes

Project is not supposed to be run locally.
