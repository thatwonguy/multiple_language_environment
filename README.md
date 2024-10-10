# Purpose - DEMO of multi-language coding environment

To achieve a system where Python, C#, and Java files interact with each other, passing variables between them, and then displaying the results in a Streamlit web UI, here's an outline of how you can set up and write code in these languages and integrate them:

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