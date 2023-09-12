export default async function deleteCourse(courseId) {
    try {
      // Define the URL of the API endpoint for deleting a specific course.
      const apiUrl = `http://localhost:3000/api/courses/${courseId}`;
  
      // Define the request options, including the method (DELETE).
      const requestOptions = {
        method: "DELETE",
      };
  
      // Send the DELETE request to delete the course.
      const response = await fetch(apiUrl, requestOptions);
  
      // Check if the request was successful (status code 2xx).
      if (response.ok) {
        return "Course deleted successfully";
      } else {
        // Handle non-successful responses (e.g., status code 4xx or 5xx).
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to delete course");
      }
    } catch (error) {
      // Handle any errors that occur during the process.
      console.error(error);
      throw error; // Re-throw the error to indicate a failure.
    }
  }
  