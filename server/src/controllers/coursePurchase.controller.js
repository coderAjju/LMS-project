import Stripe from "stripe";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/purchaseCourse.model.js";
import lectureModel from "../models/lecture.model.js";
import User from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // create new course purchase record
    const newPurchase = await CoursePurchase.create({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    // create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/course-progress/${courseId}`,
      cancel_url: `${process.env.CLIENT_URL}/course-details/${courseId}`,
      metadata: {
        courseId,
        userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
    });
    if (!session.url) {
      return res.status(400).json({
        success: false,
        message: "Error while creating session",
      });
    }

    // save the purchase record
    newPurchase.paymentId = session.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url, // Return the stripe checkout URL
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const stripeWebhook = async (req, res) => {
  try {
    let event;
    try {
      const payloadString = JSON.stringify(req.body, null, 2);
      const secret = process.env.STRIPE_WEBHOOK_SECRET;
      const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret,
      });
      console.log("1");
      event = stripe.webhooks.constructEvent(payloadString, header, secret);
    } catch (error) {
      console.log(error);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    console.log("2");
    // handle the checkout session complete event
    if (event.type === "checkout.session.completed") {
      console.log("3");
      const session = event.data.object;
      const course = await CoursePurchase.findOne({
        paymentId: session.id,
      }).populate({ path: "courseId" });

      console.log("4");
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (session.amount_total) {
        course.amount = session.amount_total / 100;
      }
      console.log("5");
      course.status = "completed";

      await course.save();
      console.log("6");
      //Update users enrolled course
      await User.findByIdAndUpdate(
        course.userId,
        { $addToSet: { enrolledCourses: course.courseId._id } },
        { new: true }
      );

      console.log("7");

      // Update course with enrolled student
      await Course.findByIdAndUpdate(
        course.courseId._id,
        { $addToSet: { enrolledStudents: course.userId } },
        { new: true }
      );
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.log(error);
  }
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate("lectures")
      .populate("creator");

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const purchased = await CoursePurchase.findOne({
      courseId,
      userId,
    });
    if (!!purchased) {
      if (course && course.lectures.length > 0) {
        await lectureModel.updateMany(
          { _id: { $in: course.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }
    } else {
      if (course && course.lectures.length > 0) {
        await lectureModel.updateMany(
          { _id: { $in: course.lectures } },
          { $set: { isPreviewFree: false } }
        );
      }
    }

    // agar course purchase hai to yehin course ke saare lectures ko ispreviewfree true kar do

    return res.status(200).json({
      course,
      purchased: !!purchased, // true if course purchased, otherwise false
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
  res.json({ message: "hello" });
};

export const getAllPurchasedCourse = async (req, res) => {
  try {
    const purchasedCourses = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    if (!purchasedCourses) {
      return res.status(404).json({
        purchasedCourses: [],
      });
    }
    return res.status(200).json({
      purchasedCourses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
