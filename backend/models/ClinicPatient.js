const mongoose = require("mongoose");
const Joi = require("joi");

const { Schema } = mongoose;
// ADDDDD NATIONALID PICTURE ATTRIBUTE YALLA
const patientSchema = new Schema(
  {
    name: String,
    username: {
      type: String,
      unique: true,
    },
    password: String,
    email: {
      type: String,
      unique: true,
    },
    dob: Date,
    gender: String,
    mobile: {
      type: String,
      unique: true,
    },
    nationalId: {
      type: String,
      unique: true,
    },
    wallet: {
      type: Number,
      default: 0,
    },
    familyDiscount: {
      type: Number,
      default: 0,
    },
    familyMembers: [
      {
        name: String,
        age: Number,
        gender: String,
        relationToPatient: {
          type: String,
          enum: ["child", "husband", "wife"],
        },
        nationalId: String,
      },
    ],
    linkedFamily: [
      {
        member: {
          type: Schema.Types.ObjectId,
          ref: "ClinicPatient",
        },
        relationToPatient: {
          type: String,
        },
      },
    ],
    emergencyContact: {
      name: String,
      mobile: String,
      relation: String,
    },
    healthPackage: {
      status: {
        type: String,
        default: null,
        enum: ["subscribed", "unsubscribed", "cancelled", null],
      },
      package: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: "HealthPackage",
      },
      endDate: Date,
      cancelDate: Date,
      unsubscribeDate: Date,
      pricePaid: {
        type: Number,
        default: 0,
      },
    },
    healthRecords: [
      {
        data: Buffer,
        contentType: String,
        fileName: String,
      },
    ],
    medicalHistory: [
      {
        data: Buffer,
        contentType: String,
        fileName: String,
      },
    ],
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
    pharmacyPatient: {
      type: Schema.Types.ObjectId,
      ref: "PharmacyPatient",
      default: null,
    },
    // prescriptions: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Prescription",
    //   },
    // ],
    // appointments: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Appointment",
    //   },
    // ],
  },
  { toJSON: { virtuals: true } }
);

const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

patientSchema.virtual("formattedDob").get(function () {
  return new Intl.DateTimeFormat("en-US", options).format(this.dob);
});

const ClinicPatient = mongoose.model("ClinicPatient", patientSchema);

module.exports = ClinicPatient;
