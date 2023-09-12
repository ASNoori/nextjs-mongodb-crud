export default async function createCourse(courseData) {
    try {
      // Define the URL of the API endpoint where you want to create a course.
      const apiUrl = "http://localhost:3000/api/courses";
  
      // Define the request options, including the method (POST), headers, and body.
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON.
        },
        body: JSON.stringify(courseData), // Convert the course data to JSON format.
      };
  
      // Send the POST request to create the course.
      const response = await fetch(apiUrl, requestOptions);
  
      // Check if the request was successful (status code 2xx) and return the response.
      if (response.ok) {
        const createdCourse = await response.json();
        return createdCourse.data;
      } else {
        // Handle non-successful responses (e.g., status code 4xx or 5xx).
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to create course");
      }
    } catch (error) {
      // Handle any errors that occur during the process.
      console.error(error);
      throw error; // Re-throw the error to indicate a failure.
    }
  }
  