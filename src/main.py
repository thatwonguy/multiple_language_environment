import subprocess
import streamlit as st

# Call C# program
def call_csharp(input_value):
    try:
        # Updated path to the compiled C# executable with proper format for Windows
        result = subprocess.run(['dotnet', '../CSharpProgram/bin/CSharpProgram.dll', input_value], capture_output=True, text=True)
        return result.stdout.strip()
    except Exception as e:
        return f"Error in C#: {str(e)}"

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
