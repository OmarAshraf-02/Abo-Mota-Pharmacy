import Button from "../../../shared/components/Button";
import { useEffect, useState } from "react";
import Input from "../../../shared/components/InputField";
import './styles.css';
import DateInput from "../../../shared/components/DateInput";
import logo from '../../../shared/assets/logo.png';
import * as yup from 'yup';
import Header from "../../../shared/components/Header";
import { Formik } from "formik";
import LoadingIndicator from "../../../shared/components/LoadingIndicator";
import { useNavigate } from "react-router-dom";
import DropDown from "../../../shared/components/DropDown";
import { useRegisterPharmacistMutation } from "../../../store";
import FileInput from "../../../shared/components/FileInput";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [registerPharmacist, results] = useRegisterPharmacistMutation();
  const [error, setError] = useState('');
  const [pharmacist, setPharmacist] = useState({});
  useEffect(() => {
    if (results.isError) {
      setError(results.error.data.message);
      console.log(error);
    }else if(results.isSuccess){
      setPharmacist(results.data);
      console.log(pharmacist);
    }
  },[results]);

  const handleSubmit = async (values, { resetForm }) => {
    // values contains all the data needed for registeration
    // console.log(values);
    console.log(values);
    const pharmacist = {
      dob: values.dateOfBirth,
      email: values.email,
      name: `${values.firstName} ${values.lastName}`,
      gender: values.gender,
      mobile: values.mobileNumber,
      nationalId: values.nationalId,
      username: values.userName,
      password: values.password,
      rate: values.hourlyRate,
      affiliation: values.affiliation,
      educationalBackground: values.educationalBackground,
      workingLicense: values.workingLiscense,
      pharmacyDegree: values.pharmacyDegree
    }
    setIsLoading(true);
    await registerPharmacist(pharmacist);
    // await new Promise(resolve => setTimeout(resolve, 3000));
    // Remove the above await and insert code for backend registeration here.
    setIsLoading(false);
    resetForm({ values: '' });
    navigate('/pharmacist/medicine');
};


  const PharmacistForm = (
    <Formik
    initialValues={initialPharmacistValues}
    validationSchema={PharmacistSchema}
    onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          {console.log(formik.values)}
          <div className="form-container">         
            <Input 
            label="Email*" 
            type="text" 
            id="email"
            error={formik.errors.email}
            touch={formik.touched.email}
            {...formik.getFieldProps('email')}
            />
          </div>
          <div className="form-container">
          <Input 
            label="Username*" 
            type="text" 
            id="userName"
            error={formik.errors.userName}
            touch= {formik.touched.userName}
            {...formik.getFieldProps('userName')}
            />
            <FileInput 
            label="NationalID*" 
            id="nationalId"
            name="nationalId" // Ensure this is set to correctly associate with Formik's `getFieldProps`
            error={formik.errors.nationalId}
            touch={formik.touched.nationalId}
            onChange={(file) => formik.setFieldValue('nationalId', file)}
            onBlur={() => formik.setFieldTouched('nationalId', true)} // To handle touch status
            />

            </div>
            <div className="form-container">
            <Input 
            label="First Name*" 
            type="text" 
            id="firstName"
            error={formik.errors.firstName}
            touch= {formik.touched.firstName}
            {...formik.getFieldProps('firstName')}
            />  
            <Input 
            label="Last Name*" 
            type="text" 
            id="lastName"
            error={formik.errors.lastName}
            touch= {formik.touched.lastName}
            {...formik.getFieldProps('lastName')}
            />   
          </div>
          <div className="form-container">
            <DateInput 
            label="Date of Birth*" 
            id="dob"
            error={formik.errors.dateOfBirth}
            touch = {formik.touched.dateOfBirth}
            {...formik.getFieldProps('dateOfBirth')}
            onChange={formik.handleChange}
            /> 
            <DropDown 
            label="Gender*" 
            type="text" 
            id="gender"
            error={formik.errors.gender}
            onChange={formik.handleChange}
            touch = {formik.touched.gender}
            options={['male', 'female']}
            {...formik.getFieldProps('gender')}
            /> 
          </div>
          <div className="form-container">           
            <Input 
            label="Affliation(Hospital)*" 
            type="text" 
            id="affiliation"
            error={formik.errors.affiliation}
            touch = {formik.touched.affiliation}
            {...formik.getFieldProps('affiliation')}
            />  
            <Input 
            label="Educational Background*" 
            type="text" 
            id="educationalBackground"
            error={formik.errors.educationalBackground}
            touch = {formik.touched.educationalBackground}
            {...formik.getFieldProps('educationalBackground')}
            />  
          </div>
          <div className="form-container">
            <Input 
            label="Phone number*" 
            type="tel" 
            id="mobileNumber"
            error={formik.errors.mobileNumber}
            touch = {formik.touched.mobileNumber}
            {...formik.getFieldProps('mobileNumber')}
            />
            <Input 
            label="Hourly rate in USD*" 
            type="number" 
            id="hourlyRate"
            error={formik.errors.hourlyRate}
            touch = {formik.touched.hourlyRate}
            {...formik.getFieldProps('hourlyRate')}
            />       
          </div>
          <div className="form-container">
          <Input 
            label="Password*" 
            type="password" 
            id="password"
            error={formik.errors.password}
            touch = {formik.touched.password}
            {...formik.getFieldProps('password')}
            />
            <Input 
            label="Confirm Password*" 
            type="password" 
            id="confirmPassword"
            error={formik.errors.confirmPassword}
            touch = {formik.touched.confirmPassword}
            {...formik.getFieldProps('confirmPassword')}
            />  
          </div>
          <div className="form-container">
          <FileInput
            label="Pharmacy Degree*"
            id="pharmacyDegree"
            name="pharmacyDegree" // Ensure this is set to correctly associate with Formik's `getFieldProps`
            error={formik.errors.pharmacyDegree}
            touch={formik.touched.pharmacyDegree}
            onChange={(file) => formik.setFieldValue('pharmacyDegree', file)}
            onBlur={() => formik.setFieldTouched('pharmacyDegree', true)} // To handle touch status
            />
          <FileInput
            label="Working Liscense*"
            id="workingLiscense"
            name="workingLiscense" // Ensure this is set to correctly associate with Formik's `getFieldProps`
            error={formik.errors.workingLiscense}
            touch={formik.touched.workingLiscense}
            onChange={(file) => formik.setFieldValue('workingLiscense', file)}
            onBlur={() => formik.setFieldTouched('workingLiscense', true)} // To handle touch status
            />
          </div>
          <div className="submit-add-medicine-button-container">
          {isLoading ? <LoadingIndicator /> :
            // <Link to='medicine'>
              <Button type="submit">
                Submit Form
              </Button>
            // </Link>
          }
        </div>
        </form>
      )}

    </Formik>
  );
   
  return (
    <div className="registesr-div">
      <div className="register-portal">
        <div className="register-part">
          <Header header="Welcome to Abo Mouta Pharmacy!" subheader="We are glad you want to join us!"/>
          {PharmacistForm}
        </div>
        <div className="logo-div"> <img className="register-logo" src={logo} alt="logo"/> </div>
      </div>
    </div>
  );
}

const FILE_SIZE = 10000 * 1024; // e.g., 160 KB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf'];


const PharmacistSchema = yup.object().shape({
  userName: yup.string().min(3, 'Username must be at least 3 characters long').max(50, 'Username must be at most 50 characters long').required('Please enter a valid username'),
  
  firstName: yup.string().min(2, 'First Name must be at least 2 characters long').max(50, 'First Name must be at most 50 characters long').required('Please enter a valid First Name'),
  
  lastName: yup.string().min(2, 'Last Name must be at least 2 characters long').max(50, 'Last Name must be at most 50 characters long').required('Please enter a valid Last Name'),

  email: yup.string().email('Invalid email').required('Please enter a valid email address'),

  password: yup.string().min(8, 'Password must be at least 8 characters long').matches(/[a-zA-Z]/, 'Password must contain at least one letter').matches(/[0-9]/, 'Password must contain at least one number').required('Please enter a valid password'),

  confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
  
  dateOfBirth: yup.date().max(new Date(), 'Date of Birth should be in the past').required('Please enter your date of birth'),

  hourlyRate: yup.number().positive('Hourly rate should be a positive number').required('Please enter your hourly rate'),

  affiliation: yup.string().min(3, 'Affiliation (Hospital) must be at least 3 characters long').max(50, 'Affiliation (Hospital) must be at most 50 characters long').required('Please enter your affiliation (hospital)'),

  gender: yup.string().oneOf(['male', 'female'], 'Invalid gender').required('Please select a gender'),

  mobileNumber: yup.string().matches(/^[0-9]{11}$/, 'Mobile number must be exactly 11 digits').required('Please enter a valid mobile number'),

  educationalBackground: yup.string().min(10, 'Educational Background must be at least 10 characters long').max(50, 'Educational Background must be at most 50 characters long').required('Please enter your educational background'),

  pharmacyDegree: yup
  .mixed()
  .required('A file is required')
  .test(
    'fileFormat',
    'Unsupported Format',
    (value) => {
      let file = value instanceof FileList ? value[0] : value;
      return file && SUPPORTED_FORMATS.includes(file.type);
    }
  )
  .test(
    'fileSize',
    'File too large',
    (value) => {
      let file = value instanceof FileList ? value[0] : value;
      return file && file.size <= FILE_SIZE;
    }
  ),
  
  nationalId: yup
    .mixed()
    .required('A file is required')
    .test(
      'fileFormat',
      'Unsupported Format',
      (value) => {
        let file = value instanceof FileList ? value[0] : value;
        return file && SUPPORTED_FORMATS.includes(file.type);
      }
    )
    .test(
      'fileSize',
      'File too large',
      (value) => {
        let file = value instanceof FileList ? value[0] : value;
        return file && file.size <= FILE_SIZE;
      }
    ),

    workingLiscense: yup
    .mixed()
    .required('A file is required')
    .test(
      'fileFormat',
      'Unsupported Format',
      (value) => {
        let file = value instanceof FileList ? value[0] : value;
        return file && SUPPORTED_FORMATS.includes(file.type);
      }
    )
    .test(
      'fileSize',
      'File too large',
      (value) => {
        let file = value instanceof FileList ? value[0] : value;
        return file && file.size <= FILE_SIZE;
      }
    )

});


const initialPharmacistValues = {
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',  
  dateOfBirth: '',
  hourlyRate: '',
  affiliation: '',
  pharmacyDegree: null,
  gender: 'male',
  mobileNumber: '',
  nationalId: null,
  workingLiscense: null,
  educationalBackground: '',
};



export default RegisterForm;