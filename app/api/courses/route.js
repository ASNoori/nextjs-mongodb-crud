import mongoDBConnect from "/lib/MongodbConnect";
import Course from "/models/courseModel";
import { NextResponse } from "next/server";

// GET All Courses or GET A Course By ID
export async function GET(request) {
  try {
    // Check if the request has an 'id' parameter
   const id= request.nextUrl.searchParams.get("id");

    // Connect to the DB
    await mongoDBConnect();

    if (id) {
      // If 'id' is provided in the request, get a course by ID
      const course = await Course.findOne({ _id: id });

      if (!course) {
        return NextResponse.json(
          {
            message: "Course not found",
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(
        {
          message: "OK",
          data: course,
        },
        { status: 200 }
      );
    } else {
      // If 'id' is not provided, get all courses
      const courses = await Course.find();

      return NextResponse.json(
        {
          message: "OK",
          data: courses,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch courses",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}


//Create a Course
export async function POST(request) {
  try {
    //Get the data from the request
    const { title, description } = await request.json();
    const newCourse = {
      title,
      description,
    };
    // Connect to the DB
    await mongoDBConnect();
    //Use the Model to create
    await Course.create(newCourse);
    return NextResponse.json(
      {
        message: "Course created successfully",
        data: newCourse,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Create a Course",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// DELETE A COURSE
export async function DELETE(request) {
  try {
    //Get the Id of the course
    const id = request.nextUrl.searchParams.get("id");
    //Connect to db
    await mongoDBConnect();
    //Use the model to delete
    await Course.findByIdAndDelete(id);
    //return the response
    return NextResponse.json(
      {
        message: "Course deleted Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Delete a Course",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

//Update/EDITING a Course
export async function PUT(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    //Get the data from the request
    const { title: title, description: description } =
      await request.json();
    const newCourse = {
      title,
      description,
    };
    // Connect to the DB
    await mongoDBConnect();
    //Use the Model to update
    await Course.findByIdAndUpdate(id, newCourse);
    return NextResponse.json(
      {
        message: "Course Updated successfully",
        data: newCourse,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Create a Course",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
