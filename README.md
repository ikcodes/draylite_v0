# Draylite Version 0
Draylite is an internal tool used by Gateway Logistics to manage user-supplied logistics intelligence. The application is currently centered around Drayage: the process of moving containers out of storage at international ports, to a location where they can be transferred to long-haul carriers. 

Containers move from Ports to Warehouses via Carriers. The application serves as a "living list" of current carriers, their status, and which ones to use.

## App structure
- Port
  - Carrier
    - Contacts
    - Documents
    - Comments
  - Warehouses
    - Contacts
    - Documents
    - Comments
    
## A Few Key Terms
**Port**: the relative service area of a U.S. Sea Port or cluster of ports. For example, LA and Long Beach co-exist under the same label because they're adjacent.
**Entity**: one of several data bodies with the same attributes tied to them. Primarily Carriers and Warehouses, as each has Contacts, Documents, and Comments.

## Environment / Depoloyment

This app is configured to run in Serverless Cloud. Development requires an internet connection, as well as an account with Serverless Cloud. (This section to be updated when Serverless Clous becomes publically available.
Documentation for Serverless Cloud (soon to become Ampt as of 05.2023) available here: https://www.serverless.com/cloud/docs

## Moving Forward

This application is currently live and in use by the client (as of late April 2023). Future aspirations include:
- Achieving separate configuration to run in a purely local environment
- Streamlining performance of complex API queries (chaining Promises)
- Converting the API to TypeScript, perhaps using a library like NestJS
