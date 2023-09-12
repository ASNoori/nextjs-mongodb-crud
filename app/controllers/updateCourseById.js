export default async function updateCourse(courseId, updatedCourseData) {
    try {
      // Define the URL of the API endpoint for updating a specific course.
      const apiUrl = `http://localhost:3000/api/courses/${courseId}`;
  
      // Define the request options, including the method (PUT), headers, and body.
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON.
        },
        body: JSON.stringify(updatedCourseData), // Convert the updated course data to JSON format.
      };
  
      // Send the PUT request to update the course.
      const response = await fetch(apiUrl, requestOptions);
  
      // Check if the request was successful (status code 2xx) and return the response.
      if (response.ok) {
        const updatedCourse = await response.json();
        return updatedCourse.data;
      } else {
        // Handle non-successful responses (e.g., status code 4xx or 5xx).
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to update course");
      }
    } catch (error) {
      // Handle any errors that occur during the process.
      console.error(error);
      throw error; // Re-throw the error to indicate a failure.
    }
  }
  