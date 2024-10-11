# Setting Up a Java Project with Maven FROM SCRATCH
## Overview
Maven is a powerful build automation tool used primarily for Java projects. It simplifies the process of managing project dependencies, building projects, and creating JAR files. This guide will walk you through the process of setting up a Java project using Maven. 

Before setting up a Maven project, you need to have the Java Development Kit (JDK) installed on your system and properly configured in the environment variables. This guide will walk you through installing Java, verifying the installation, and ensuring it works in both Command Prompt (CMD) and Git Bash.

## Prerequisites
- Java Development Kit (JDK) installed on your machine.
- Apache Maven installed on your machine.
- A Windows machine.
- Administrator privileges to install software.

## Setting Up Java on Windows (For CMD and Bash)

## Step 1: Install the Java Development Kit (JDK)

### 1.1 Download the JDK
- Go to the [Oracle JDK download page](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html).
- Select the version you want (the latest Long-Term Support (LTS) version is recommended for stability).
- Download the Windows `.exe` installer.

### 1.2 Run the Installer
- Run the `.exe` file you downloaded.
- Follow the on-screen instructions to install Java on your system.
- During the installation, note the installation path (usually something like `C:\Program Files\Java\jdk-x.x.x`).

## Step 2: Set Up Environment Variables

### 2.1 Configure Java Path in Environment Variables
1. **Open Environment Variables:**
   - Right-click **This PC** or **My Computer** and click **Properties**.
   - On the left side, click **Advanced system settings**.
   - In the **System Properties** window, click the **Environment Variables** button.

2. **Add JAVA_HOME:**
   - In the Environment Variables window, click **New** under **System Variables**.
   - Set the **Variable name** to `JAVA_HOME`.
   - Set the **Variable value** to the path of your JDK installation (e.g., `C:\Program Files\Java\jdk-15.x.x`).
   - Click **OK** to save.

3. **Update the Path variable:**
   - Under **System Variables**, find the `Path` variable and select it.
   - Click **Edit** and then **New**.
   - Add `%JAVA_HOME%\bin` to the list.
   - Click **OK** to save the changes.

### 2.2 Verify Java Installation
- Open a **new** Command Prompt or Git Bash terminal and run the following command:
```bash
java -version
```

- This should display the installed version of Java. If the output is something like:
```bash
java version "1.8.0_xxx" or java version "15.0.x"
```
Java has been installed correctly, and the environment variables are set.

You can also check the javac (Java compiler) by running:

```bash
javac -version
```
### Step 3: Verify Java in Git Bash
## 3.1 Check Git Bash Compatibility
Open Git Bash and type the following command to verify if Git Bash can recognize the Java installation:

```bash
java -version
```
This should show the same version as in the Command Prompt. If Git Bash does not recognize Java, ensure that `%JAVA_HOME%\bin` is correctly set in the system's `Path` environment variable.

### Step 4: Install Maven (After Java is Verified)
Now that Java is installed and verified, you can proceed to install Maven and set up your Java project. You can follow the next guide to install Maven.

## Troubleshooting Tips
1. **'java' is not recognized as an internal or external command:**
   - Ensure you have set the `JAVA_HOME` and `Path` variables correctly.
   - Reopen any terminal or IDE after setting the environment variables to reflect the changes.
2. **'javac' not found but 'java' is found:**
   - This indicates that the JDK's `bin` folder is not properly added to the `Path`. Double-check that `%JAVA_HOME%\bin` is included in the system's `Path` variable.
3. **Restart your computer:**
   - Sometimes, the system needs a reboot for environment variable changes to take effect.

Now that your Java environment is fully configured, you're ready to move on to Setting Up Maven.

---
---
### 1. Install Maven
#### 1. Download Maven: Visit the `Maven Download Page` and download the latest version of Maven.

#### 2. Extract Maven: Extract the downloaded file to a directory of your choice, e.g., `C:\Program Files\Apache\maven-<version>` on Windows.

#### 3. Set Environment Variables:

- **M2_HOME**: Set this to the Maven installation directory.
- **MAVEN_HOME**: Set this to the same as M2_HOME.
- **Path**: Add the `bin` directory of Maven to your system's `Path` variable (e.g., `C:\Program Files\Apache\maven-<version>\bin`).
#### 4. Verify Installation: Open a command prompt or terminal and run:

```bash
mvn -version
```
You should see the installed version of Maven if the installation was successful.

### 2. Create a Project Structure, or let Maven do it:
Instead of manually creating the directory structure, you can use the Maven archetype plugin to quickly set up a new project.

**Command:**
```bash
mvn archetype:generate -DgroupId=com.example -DartifactId=JavaProgram -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```
- This command creates a basic Maven project with the following structure:
```bash
JavaProgram/
├── pom.xml
└── src/
    ├── main/
    │   └── java/
    │       └── com/
    │           └── example/
    │               └── App.java  # This is the main Java file
    └── test/
        └── java/
            └── com/
                └── example/
                    └── AppTest.java
```
### 3. Write Your Java Code
Create a Java file named `JavaProgram.java` or anything else, or simply start writing your code in the `App.java` that maven created, in the path `src/main/java/com/example/`:

```java
package com.example;

public class JavaProgram {
    public static void main(String[] args) {
        // Read input from command line arguments
        String inputFromPython = args.length > 0 ? args[0] : "No input";

        // Process input and print output for Python
        String output = "Java received: " + inputFromPython + " and responds with a hello!";
        System.out.println(output);
    }
}
```

### 4. Compile the Java Code
To compile your Java code, navigate to the root directory of your project (JavaProgram/) and run:

```bash
mvn compile
```
- This command compiles your Java source files and prepares them for execution.
### 5. Run the Java Program
You can run your Java program directly using Maven:

```bash
mvn exec:java -Dexec.mainClass="com.example.App" -Dexec.args="Hello from terminal"
```
- This command specifies the main class to execute and passes "Hello from terminal" as an argument.
### 6. Create a JAR Package (Optional)
If you want to package your application into a JAR file, you can run:

```bash
mvn package
```
- The JAR file will be generated in the target directory. You can run it using:
```bash
java -cp target/JavaProgram-1.0-SNAPSHOT.jar com.example.App "Hello from terminal!"
```

## Maven Build Process Overview
```bash
mvn clean compile
```
- `mvn clean`: This command removes the target directory, which contains all compiled files, artifacts, and any previously generated files. It essentially cleans the project state.  
- `mvn compile`: This command compiles the Java source files located in the src/main/java directory. If there are any issues during compilation (like syntax errors), they will be reported in the console.
```bash
mvn exec:java
```
- `mvn exec:java`: This command runs the Java application defined in your pom.xml file, specifically the class specified by the -Dexec.mainClass parameter. It allows you to pass additional arguments using -Dexec.args="your arguments", which will be passed to the main method of the specified class.
## Why Use Maven?
1. Dependency Management: Maven automatically downloads and manages libraries required for your project.
2. Build Automation: Simplifies the build process through a standard lifecycle that includes compiling, testing, and packaging.
3. Project Structure: Enforces a standard directory structure, making it easier to understand and maintain.
## Summary

Using Maven simplifies the process of managing Java projects. It helps in organizing your code, managing dependencies, and packaging your applications efficiently. With this guide, you should be able to set up a Java project using Maven successfully...OR you can just manually figure it out and brute force it :P if you like.

>[!NOTE]
> `Maven` is just one way of setting up a `Java` coding project quickly in a standard fashion instead of doing it manually. We didn't have to use Maven or any of it but we simply decided to for demo purposes and to help ensure best practices were demoed for Java environments. It is the one we use here but it's not the only alternative to doing it manually. Here are a few other options:
>
> - `Gradle`: More concise and flexible build scripts, faster build times, and better performance.
> - `Ant`: Focuses on flexibility and customizability, with a steeper learning curve.
> - `Bazel`: Emphasizes performance and reproducibility, with a language-agnostic build file syntax.
> - `Buildr`: Simplifies the build process with a more concise syntax, but may lack some features found in Maven.
