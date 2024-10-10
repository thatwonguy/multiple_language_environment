// step 1: create maven project structure for java ---> mvn archetype:generate -DgroupId=com.example -DartifactId=JavaProgram -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
// step 2: write the java code (you see it below taking input from python)
// step 3: cd to the directoy where the code is and compile the java code --->  javac JavaProgram.java, or if using maven do ----> mvn compile
// step 4: test it ---> mvn exec:java -Dexec.mainClass="com.example.App" -Dexec.args="Hello from terminal"

package com.example;

public class App {
    // The entry point of the Java program
    public static void main(String[] args) {
        // Check if there is at least one argument passed (from Python or terminal).
        // If so, store the first argument in the variable `inputFromPython`, otherwise store "No input".
        String inputFromPython = args.length > 0 ? args[0] : "No input";

        // Create a new string called `output` which contains the message with the input received.
        String output = "Java received: " + inputFromPython + " and responds with a hello!";

        // Print the `output` string to the console (which Python will capture if it's running this).
        System.out.println(output);
    }
}