# Transition from Streamlit UI to React Frontend

## Overview
In this project, we replaced the Streamlit UI with a basic React frontend to enhance user interaction and integrate with our multi-language communication system (Python, C#, Java). Below are the instructions to set up your development environment and run the React application.

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed on your system.
2. **Git**: Make sure Git is installed to manage version control.

## Installing Node.js on Windows

1. **Download Node.js**:
   - Visit the [Node.js official website](https://nodejs.org/).
   - Download the Windows Installer (.msi) for the latest LTS (Long Term Support) version.

2. **Install Node.js**:
   - Run the downloaded installer.
   - Follow the setup wizard, ensuring you check the option to install the necessary tools for Native Modules.

3. **Set Environment Variables**:
   - Node.js should automatically set the environment variables during installation.
   - To verify, open Command Prompt and type:
     ```bash
     node -v
     npm -v
     ```
   - If both commands return version numbers, Node.js and npm are installed correctly.

## Setting Up Bash Environment

1. **Using Git Bash**:
   - If you have Git installed, you should have Git Bash available. You can use this to run commands in a Unix-like shell.
   - Open Git Bash from your Start menu or by right-clicking in a folder.

## Creating a React Project

1. **Create a New React App**:
   - Open Git Bash and navigate to your desired directory:
     ```bash
     cd /path/to/your/directory
     ```
   - Create a new React application using Create React App:
     ```bash
     npx create-react-app my-app
     ```
   - Replace `my-app` with your desired project name.

2. **Navigate to Your Project Directory**:
   ```bash
   cd my-app
   ```

## Modifying the React Application

1. **Update the `src/App.js` File**:
   Replace the content of `src/App.js` with the following code:

   ```javascript
   import React, { useState } from 'react';
   import './App.css';

   function App() {
     const [input, setInput] = useState('');
     const [response, setResponse] = useState('');

     const handleSubmit = async (event) => {
       event.preventDefault();
       const res = await fetch("http://localhost:8000/", { // point to the correct endpoint
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ input }), // Send input value
       });

       if (!res.ok) {
         const errorMessage = await res.text();
         console.error("Error response:", errorMessage);
         return;
       }

       const data = await res.json();
       setResponse(data);
     };

     return (
       <div className="App">
         <h1>Multi-Language Communication</h1>
         <form onSubmit={handleSubmit}>
           <input
             type="text"
             value={input}
             onChange={(e) => setInput(e.target.value)}
             placeholder="Enter message"
           />
           <button type="submit">Send</button>
         </form>
         <h2>Response:</h2>
         <p>{response["C# Output"]}</p>
         <p>{response["Java Output"]}</p>
         <p>{response["Python Output"]}</p>
       </div>
     );
   }

   export default App;
   ```

## Running the React Application

1. **Install Dependencies**:
   - Run the following command to install project dependencies:
     ```bash
     npm install
     ```
   - **Check for Updates**
   
     To check for outdated packages in your project, run the following command in your project's root directory:
     ```bash
     npm outdated
     ```
     - This command will display a list of packages that are outdated along with their current, wanted, and latest versions.

    - **Install Latest Major Version**
    If you want to update all packages to their latest major versions (which might include breaking changes), you can use the npm-check-updates package:
        ```bash
        npm install -g npm-check-updates
        ```
        - and then type the following to check dependencies and continue to get rid of errors before compiling:
        ```bash
        ncu
        ```
        - if needed run the following to update your `package.json`:
        ```bash
        ncu -u
        ```
        - now install all the updated packages again if needed:
        ```bash
        npm install
        ```

2. **Run the Development Server**:
   - Start the React application:
     ```bash
     npm start
     ```
   - This will open your default web browser at `http://localhost:3000`, where you can interact with your new React UI.

## Building the React Application for Production

1. **Build the Application**:
   - To create a production build of your app, run:
     ```bash
     npm run build
     ```
   - This will generate static files in the `build` directory.

## Conclusion

You have successfully transitioned from a Streamlit UI to a React frontend. You can now integrate it with your existing multi-language backend (Python, C#, Java) and run your application.

### Notes
- Ensure that your backend FastAPI service is running on the specified port (`8000` in this case) while testing the React application.
- Adjust paths and variable names in the instructions as needed to fit your project's structure.