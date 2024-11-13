
# Elite Estates

**Table of Contents**

1. [Pre-requisites](#pre-requisites)
2. [Getting Started](#getting-started)
3. [Folder Structure](#folder-structure)
4. [Styling](#styling)
5. [Deployment](#deployment)

**Pre-requisites**

* Node.js: Download and install from [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager)

**Getting Started**

1. Clone the repository and navigate to the project root.
2. Create a new file named `.env` and copy the contents of `.env.example` into it. Alternatively, run the command `cp .env.example .env` on Mac.
3. API keys will be sent via email. If you don't receive them, you can obtain them from the following websites:
	* Zillow API: [https://rapidapi.com/oneapiproject/api/zillow-working-api/playground/apiendpoint_68fbab94-16cf-4b5a-a643-a6f8fcee068d](https://rapidapi.com/oneapiproject/api/zillow-working-api/playground/apiendpoint_68fbab94-16cf-4b5a-a643-a6f8fcee068d)
	* IP Geolocation API: [https://ipinfo.io/products/ip-geolocation-api](https://ipinfo.io/products/ip-geolocation-api)
4. Install dependencies by running `npm install`.
5. Start the application by running `npm run dev`.

**Folder Structure**

* `src`: Contains the source code for the application.
	+ `api`: API calls and endpoints.
	+ `assets`: Logos, images, and other static assets.
	+ `components`: Reusable UI components (e.g., SelectMenu, RangeSelector, NavBar).
	+ `pages`: Individual pages (e.g., Home, SearchResults).
	+ `App.jsx`: Main application component and routes.
	+ `slices`: Redux slices for state management.
	+ `utils`: Helper functions and utilities.
	+ `store`: Redux store configuration.

**Styling**

* Material UI: Used for UI component styling.
* Tailwind CSS: Used for utility-first CSS styling.

**Deployment**

* Deployed on Vercel: [https://elite-estates-finder.vercel.app/](https://elite-estates-finder.vercel.app/)