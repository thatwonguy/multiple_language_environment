# Setting Up C# on Windows FROM SCRATCH

### Step 1: Install .NET SDK
The .NET SDK includes everything you need to build and run C# applications. Here's how to install it:

#### 1. Download .NET SDK:
- Go to the official [.NET SDK download page](https://dotnet.microsoft.com/download/dotnet).
- Select the latest version (LTS is recommended for stability).
- Download and install the `.NET SDK` installer for Windows.

#### 2. Run the Installer:
- Follow the on-screen instructions to install the SDK.
- Once the installation is finished, the SDK should be set up with default paths.

### Step 2: Verify Installation
#### 1. **Check Environment Variables:** 
After installation, the `.NET` commands should be available in the terminal. To confirm that everything is set up properly, follow these steps:

- Open **Command Prompt** or **PowerShell**.
- Run the following command to verify that `.NET` is installed correctly:
```bash
dotnet --version
```
- If the installation was successful, this command will output the version number of the installed .`NET SDK`.
#### 2. Ensure Environment Variables are Set Correctly:
- To ensure that `dotnet` is available globally, check the `PATH` environment variable.
- Steps:
    - Right-click on **This PC** or **My Computer** on the desktop or in File Explorer.
    - Select **Properties** > **Advanced system settings** > **Environment Variables**.
    - Under **System Variables**, scroll to **Path** and ensure that the following path exists (the version might differ):
```makefile
C:\Program Files\dotnet\
```
- If it's not there, click **Edit**, then **New**, and add the above path.
### Step 3: Install Git Bash for Windows
If you plan to use Bash on Windows, you’ll need Git Bash:

1. **Download Git Bash:**
Go to the official Git for Windows website.
Download the installer.
2. **Install Git Bash:**
Follow the installation instructions.
During the installation, choose Git Bash as the default terminal emulator for Git.
3. **Verify Bash is Working:**
After installation, open Git Bash.
You can run bash commands like `ls`, `cd`, and others to verify that it's working correctly.

### Step 3.1: Verify install and accessibility of C# on your system:
- Run the following command in `bash` and `cmd` to make sure its installed on your system:
```bash
dotnet --version
```
- If this shows the version, it means .NET SDK is properly installed and C# is available for development.

### Step 4: Create a Simple C# Program
Now that the development environment is set up, you can create a C# program.

#### 1. Create a New Directory for the Project:
Open **Git Bash** or **Command Prompt** and navigate to the location where you want to create the project:

```bash
mkdir CSharpProgram
cd CSharpProgram
```
#### 2. Initialize a New C# Console Project:
Run the following command to create a new C# console application:

```bash
dotnet new console -n MyCSharpApp
cd MyCSharpApp
```

This will create a new directory called `MyCSharpApp` containing the basic files for a C# console application, including the `Program.cs` file.

#### 3. Write Your C# Code:
Open the `Program.cs` file in a text editor (or any IDE such as Visual Studio Code):

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        // Read input from command line arguments
        string input = args.Length > 0 ? args[0] : "No input provided";
        Console.WriteLine($"C# received: {input} and responds with a greeting!");
    }
}
```

### Step 5: Compile and Run the C# Program
#### 1. Build the Application:
To compile the C# program, run the following command in the project directory (`MyCSharpApp`):

```bash
dotnet build
```
#### 2. Run the Application:
After a successful build, you can run the application and pass arguments if your app takes them:
```bash
dotnet run "Hello from Python"
```
You should see the following output or something similar in our case:

```bash
C# received: Hello from Python and responds with a greeting!
```

#### 3. Publish as a Standalone Executable (Optional):
You can also publish the project as a standalone executable if needed:

```bash
dotnet publish -c Release -r win-x64 --self-contained
```

This will create a standalone application in the bin/Release/net6.0/win-x64/publish/ directory, which can run on any Windows machine without requiring the .NET runtime to be installed.

### Conclusion: 
By following these steps, you’ll be able to install, set up, and run a simple C# program on Windows from scratch.