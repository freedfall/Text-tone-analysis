# Text tone analyzer

## Description

This project is designed to analyze the emotional tone of the input text and visualize it. It integrates **IBM Watson Natural Language Understanding API** for emotion analysis and allows users to upload text files or input text manually.

### Outline

* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Usage](#usage)

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

Follow these steps to run the project locally:

  * Clone the Repository

    ```bash
    git clone https://github.com/freedfall/Text-tone-analysis.git
    cd Text-tone-analysis
    ```

  * Install Dependencies

    In the project directory, run the following command to install the necessary packages:

    ```bash
    npm install
    ```

  * IBM Watson Setup

    To use IBM Watson Natural Language Understanding for emotion analysis, you need to set up your API key.

    Steps to Get Your IBM Watson API Key:

    1. Go to the [IBM Cloud](https://cloud.ibm.com/registration) and create an account if you don't already have one.
    2. Once logged in, navigate to the **Watson Natural Language Understanding** service page.
    3. Click **Create** to set up a new service.
    4. After the service is created, navigate to the **Manage** tab.
    5. Copy your **API Key** and **Service URL**.

  * Add API Key to `.env` File

    1. In the root of your project directory, create a `.env` file (if it doesn't already exist).
       ```bash
       touch .env
       ```
    3. Add your IBM Watson API key and URL to this file:

    ```plaintext
    REACT_APP_IBM_API_KEY=your-ibm-watson-api-key
    REACT_APP_IBM_URL=your-ibm-service-url
    ``` 

    Replace **your-ibm-watson-api-key** and **your-ibm-service-url** with the values you obtained from the IBM Cloud.

  * Start the Development Server

    To start the project locally, use:

    ```bash
    npm start
    ```

    This will open the project in your browser at **localhost:3000**.

### Usage

1. Open the project in your browser.
2. Import a text file using the file upload input or manually type/paste text for analysis and click **Check** button to view the result.