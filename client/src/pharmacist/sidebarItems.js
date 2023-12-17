import { FaUserMd, FaCalendarCheck, FaNotesMedical, FaUsers, FaBoxOpen, FaWallet,FaHome } from 'react-icons/fa';
import { createElement } from 'react';
const items = [
  {
    key:"0",
    icon:<FaHome/>,
    label: 'Dashboard',
    to:'/pharmacist/registerPharmacist'
  },
  {
    key: '1',
    icon: <FaUserMd />,
    label: 'View Doctors',
    to: 'medicine', // Assuming you are using react-router-dom for routing
  },
  {
    key: '2',
    icon: <FaCalendarCheck />,
    label: 'View My Appointments',
    to: 'appointments',
  },
  {
    key: '3',
    icon: <FaNotesMedical />,
    label: 'View Prescriptions',
    to: 'prescriptions',
  },
  {
    key: '4',
    icon: <FaUsers />,
    label: 'View Family Members',
    to: 'familyMembers',
  },
  {
    key: '5',
    icon: <FaBoxOpen />,
    label: 'View Health Packages Options',
    to: 'healthPackages',
  },
  {
    key: '6',
    icon: <FaWallet />,
    label: 'View my Wallet',
    to: 'wallet',
  },
].map(item => ({
  ...item,
  icon: createElement(item.icon.type),
  label: item.label,
}));

export default items;
