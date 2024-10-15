[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

# Purpose - DEMO of multi-language coding environment

To achieve a system where `Python`, `C#`, and `Java` files interact with each other, passing variables between them, and then displaying the results in a `Streamlit` web UI, which later gets replaced by a `JavaScript` `React` UI, with `Nginx` being added later as well to handle front-end and back-end routing and reverse proxy, here's an outline of how you can set up and write code in these languages and integrate them:

>[!NOTE]
> The below readme is a simple method of starting from scratch, you will need to install c#, java, and python (and later node.js for javascript/react) in your environment properly and make sure all your environment variables are set up correctly to be able to work in all three environments and get them all working. The source code in this repo has additional layers of complexity in it as `maven` was used for java project management, and `poetry` was used for the python project and dependency management. Jave and C# is a compiled language and Python is a general purpose interpretted language. JavaScript is also an intepretted language. All four, and more, can be used together to get work done. This  repo provides a basic demostration of that, which essentially means multiple people who are skilled at different programming languages can work together to get coding done and build something out. In this case, python ends up bringing it all together for the back-end. There are three (and later four with react) main code files used here, located in the `src` (Python), `CSharpProgram`(C#), and `JavaProgram`(Java) directories (and `frontend`(JavaScript/React)). They contain some additional comments not found in the readme below, in case you wanted to dig deeper, although, the below readme should be more than enough to get something working for you if you simply follow it troubleshoot your way through it.

## 1. Plan the Architecture
- Python can act as the orchestrator because it integrates well with both C# and Java.
- C# and Java can be called using Python subprocesses or other methods like REST APIs.
- Streamlit will serve as the web UI to display the results.
## 2. Create a Workflow
1. Python script runs as the main orchestrator.
2. Python calls C# and Java programs using subprocesses or REST APIs, passing variables.
3. C# and Java execute their logic, then return output to Python.
4. Python collects and processes the results.
5. Streamlit is used to display the combined result on a web page.
---
---
## 3. Set Up the Environment
- Ensure you have Python, Java, C#, and Streamlit installed.
- For C#, use .NET Core SDK.
- For Java, ensure JDK is installed.
- Install Streamlit for Python by running:

```bash
pip install streamlit
```
## 4. Write the C# Program
`CSharpProgram.cs`
```csharp
using System;

namespace CSharpProgram
{
    class Program
    {
        static void Main(string[] args)
        {
            // Read input from Python
            string inputFromPython = args.Length > 0 ? args[0] : "No input";

            // Process input and print output for Python
            string output = $"C# received: {inputFromPython} and responds with a greeting!";
            Console.WriteLine(output);
        }
    }
}
```
### Compilation Command:

```bash
dotnet build -o ./bin
```
This will create the binary in the ./bin folder, which you can call from Python.
---
---
## 5. Write the Java Program
`JavaProgram.java`
```java
public class JavaProgram {
    public static void main(String[] args) {
        // Read input from Python
        String inputFromPython = args.length > 0 ? args[0] : "No input";

        // Process input and print output for Python
        String output = "Java received: " + inputFromPython + " and responds with a hello!";
        System.out.println(output);
    }
}
```
### Compilation Command:
```bash
javac JavaProgram.java
```
This will compile the JavaProgram.class, which can also be called from Python.
---
---
## 6. Write the Python Orchestrator
`main.py`
```python
import subprocess
import streamlit as st

# Call C# program
def call_csharp(input_value):
    try:
        result = subprocess.run(['dotnet', './CSharpProgram/bin/CSharpProgram.dll', input_value], capture_output=True, text=True)
        return result.stdout.strip()
    except Exception as e:
        return f"Error in C#: {str(e)}"

# Call Java program
def call_java(input_value):
    try:
        result = subprocess.run(['java', 'JavaProgram', input_value], capture_output=True, text=True)
        return result.stdout.strip()
    except Exception as e:
        return f"Error in Java: {str(e)}"

# Streamlit web UI
def main():
    st.title("Cross-Language Communication")
    st.write("This app communicates between Python, C#, and Java")

    # User input
    user_input = st.text_input("Enter a message to send to C# and Java", "Hello from Python")

    if st.button("Send"):
        # Call C# and Java
        csharp_output = call_csharp(user_input)
        java_output = call_java(user_input)

        # Display results
        st.subheader("C# Output:")
        st.write(csharp_output)

        st.subheader("Java Output:")
        st.write(java_output)

if __name__ == "__main__":
    main()
```
## 7. Running the Solution
### 1. Compile and run the C# and Java programs:

- Compile C# using dotnet build.
- Compile Java using javac JavaProgram.java.
### 2. Run the Python Orchestrator with Streamlit:

- Run the Streamlit app using:
```bash
streamlit run main.py
```
### 3. Interaction Flow:
- The user enters input in the Streamlit UI.
- The Python script calls both C# and Java programs, passes the input, and gets the response.
- Streamlit then displays the responses from both C# and Java in the web UI.
## 8. Push to GitHub
- Initialize the Git repository:
```bash
git init
git add .
git commit -m "Initial commit for Python, C#, and Java interaction"
```
- Add the remote repository and push:
```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```
## 9. Comparison between Python, C#, and Java "Hello World"
- **Python:**
```python
print("Hello, World!")
```
- **C#:**
```csharp
Console.WriteLine("Hello, World!");
```
- **Java:**
```java
System.out.println("Hello, World!");
```
This setup allows you to write a multi-language project where Python interacts with both C# and Java, and you can easily push and test changes in GitHub.

---
--- 
# Updates - 10/10/24  

## Breakdown of updates
### 1. React Frontend:

>[!NOTE]
> Now that we have a `react` front-end and `python` backend, you will need to run both separately in two terminal windows so they can both be active and communicate with each other. 
As a result we also have to implement CORS in our python API.
>
> **Understanding CORS:**  
>Cross-Origin Resource Sharing (CORS) is a security feature implemented in web browsers to prevent malicious sites from accessing resources from another domain. In our setup, the React app running on `localhost:3000` needs permission to access the FastAPI backend running on `localhost:8000`. The CORS middleware allows us to specify which origins are permitted to make requests to our server.

- We ended up using a basic react frontend to replace the streamlit UI initially used, just to integrate more languages into the mix (in this case javascript).
- The user types a message (in this case, "hi") into the input field and submits it.
- The frontend sends this message to the FastAPI backend via a POST request.
### 2. FastAPI Backend:

- The FastAPI application receives the request and extracts the input message from the JSON body.
- It calls the C# and Java programs, passing the user's input to both.
- The FastAPI app collects the responses from the C# and Java programs and constructs a final response, including its own message.
### 3. C# Program:

- The C# program reads the input, processes it, and returns a greeting response. For example, "C# received: hi and responds with a greeting!"
### 4. Java Program:

- Similar to the C# program, the Java program processes the input and returns its own response, such as "Java received: hi and responds with a hello!"

### 5. Nginx:

- Nginx serves as a reverse proxy, routing requests from the React frontend to the FastAPI backend.
It handles serving the React app and forwards API requests to the correct backend endpoint and provides more privacy for the backend.
>[!IMPORTANT]
> The key to using Nginx, cutting through all the bs and getting straight to it. You download the zip file for your system on the Nginx website and unzip it in your computer somewhere stable where it will live and note that location down, typically directly into your `C:/` drive. Once it has been extracted there, you go navigate into the C --> nginx (folder) --> conf (folder) --> within this folder is a file called `nginx.conf` and within this file you make the necessary changes to make the proxy reverse routing happen.

- to start your nginx, navigate to the directory in bash terminal and type:
    ```bash
    start ./nginx.exe
    ```
    - to STOP your nginx:
    ```bash
    ./nginx.exe -s stop
    ```

### Final Response:

- The backend `Python` FastAPI application constructs a final response, incorporating the messages from `C#` and `Java`, as well as its own message: "Python handled all the communication between the different languages and also says hello!" and shares the results to the `JavaScript` and `React` front-end UI for the user to see. Additionally, the routing of the communcation between frontend and backend is implemented using `Nginx` as a reverse proxy and adds a layer of security and scalability.

## Summary

This setup effectively demonstrates how different programming languages can communicate with each other through a centralized Python service. This type of architecture is useful for leveraging the strengths of various languages in a single application, allowing for more complex functionalities and integration with different systems.

# How to RUN with Nginx: Start 3 separate terminals
### 1. Nginx:
- first terminal for `nginx`
- cd into your directory where you extracted your nginx
```bash
start ./nginx.exe
```
```bash
./nginx.exe -s stop
```
### 2. Python Backend
- second terminal for `python` backend api
- cd into your directory where your python api code is

```bash
poetry shell
poetry run uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
```bash
./nginx.exe -s stop
```
### 3. JavaScript React Frontend
- third terminal for `javascript` backend api
- cd into your directory where your frontend javascript code is

```bash
 npm run build
```

### 4. check it out at <http://localhost> !
