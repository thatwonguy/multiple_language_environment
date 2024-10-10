// step 1: to create C# script to start, from bash --> dotnet new console -n CSharpProgram

// step 2: start writing code inside the Programs.cs file which is this file. you see the code below in this case

// step 3: cd CSharpProgram
// step 3: compile the code ---> dotnet build -o ./bin

// step 4: test it --> dotnet bin/CSharpProgram.dll "Hello from terminal"



using System;

namespace CSharpProgram
{
    class Program
    {
        static void Main(string[] args)
        {
            // Ensure argument handling is correct
            if (args.Length > 0)
            {
                string inputFromPython = args[0];
                // Process input and print output for Python
                string output = $"C# received: {inputFromPython} and responds with a greeting!";
                Console.WriteLine(output);
            }
            else
            {
                Console.WriteLine("C# received no input and responds with 'Hello, World!'");
            }
        }
    }
}