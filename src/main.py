import subprocess
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# allow_origins: This specifies which origins are allowed to make requests. Here, it's set to allow requests from http://localhost:3000, which is where your React app runs. If your frontend is hosted elsewhere, adjust this URL accordingly.
# allow_credentials: This allows cookies and other credentials to be included in requests from the frontend.
# allow_methods: This allows specific HTTP methods (like GET, POST, PUT, DELETE) or all methods.
# allow_headers: This specifies which headers can be included in requests.

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Call C# program
def call_csharp(input_value):
    try:
        # Updated path to the compiled C# executable with proper format for Windows
        result = subprocess.run(['dotnet', '../CSharpProgram/bin/CSharpProgram.dll', input_value], capture_output=True, text=True)
        return result.stdout.strip()
    except Exception as e:
        return f"Error in C#: {str(e)}"

# Call Java program
def call_java(input_value):
    try:
        # Update the classpath to match the actual location of the JavaProgram.class
        result = subprocess.run(
            ['java', '-cp', '../JavaProgram/target/classes', 'com.example.JavaProgram', input_value],
            capture_output=True, text=True
        )
        return result.stdout.strip()
    except Exception as e:
        return f"Error in Java: {str(e)}"

@app.post("/")
async def communicate(request: Request):
    data = await request.json()
    print("Received data:", data)  # Log the incoming data
    input_value = data.get('input', '')
    csharp_output = call_csharp(input_value)
    java_output = call_java(input_value)
    python_output = "Python handled all the communication between the different langauges and also says hello!"
    return {
        "C# Output": csharp_output,
        "Java Output": java_output,
        "Python Output": python_output
    }

# can write this in terminal to run it --> poetry run uvicorn main:app --host 0.0.0.0 --port 8000 --reload
