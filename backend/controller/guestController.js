const Patient = require("../models/Patient");
const Pharmacist = require("../models/Pharmacist");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// initial testing complete, needs further edge cases tested
const registerPatient = async (req, res) => {
	try {
		const { username, nationalId, password, email } = req.body;
		// 1. Check if the user already exists
		const userExists = await Patient.findOne({ $or: [{ username }, { nationalId }, { email }] });
		if (userExists) {
			throw new Error("User with these credentials already exists");
		}

		// 2. Hash the password
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// 3. Create a new user instance and save it
		const newPatient = await Patient.create({
			...req.body,
			password: hashedPassword,
		});
		return res.status(200).json({ success: true, message: "User registered successfully" });
	} catch (error) {
		return res.status(404).json({ success: false, message: error.message });
	}
};

const registerPharmacist = async (req, res) => {
	try {
		const { username, nationalId, password, email } = req.body;

		const pharmacistExists = await Pharmacist.findOne({
			$and: [
				{ $or: [{ username }, { nationalId }, { email }] },
				{ registrationStatus: { $in: ["approved", "pending"] } },
			],
		});

		if (pharmacistExists) {
			throw new Error("Pharmacist with these credentials already exists");
		}

		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// const medicalLicenseFile = req.files['medicalLicense'][0];
		// const medicalDegreeFile = req.files['medicalDegree'][0];

		const newPharmacist = await Pharmacist.create({
			...req.body,
			password: hashedPassword,
			// medicalLicense: {
			// 	data: medicalLicenseFile.buffer,
			// 	contentType: medicalLicenseFile.mimetype
			// },
			// medicalDegree: {
			// 	data: medicalDegreeFile.buffer,
			// 	contentType: medicalDegreeFile.mimetype
			// }
		});

		return res
			.status(200)
			.json({ success: true, message: "Application is submitted successfully" });
	} catch (error) {
		return res.status(404).json({ success: false, message: error.message });
	}
};

module.exports = {
	registerPatient,
	registerPharmacist,
};
