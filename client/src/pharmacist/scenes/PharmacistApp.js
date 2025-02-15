import React from "react";
import { Routes, Route, } from "react-router-dom";
import { useEffect } from "react";
import AddMedicine from "./AddMedicine";
import SalesReport from "../../shared/pages/SalesReport";
import { useGetPharmacistQuery } from "../../store";
import ViewSettings from "./ViewSettings";
import Chat from "../../shared/pages/Chat";
import Notifications from "../../shared/pages/Notification";
import Outline from "../../shared/Outline";
import sidebarItems from "../sidebarItems"
import ChangePassword from "../../shared/components/ChangePassword";
import ViewDoctors from "./ViewDoctors";
import MedList from "./MedList";
import PharmacistHome from './PharmacistHome';

function PharmacistApp({ socket }) {

  const { data, isFetching } = useGetPharmacistQuery();

    useEffect(() => {
    !isFetching && socket.emit("user_connected", data._id)
  }, [isFetching]);

  const outlet = <Routes>
    <Route path='/' element={<PharmacistHome />} />
    <Route path='medicine' element={<MedList isPharmacist={true} />} />
    <Route path='addMedicine' element={<AddMedicine />} />
    <Route path='viewSettings' element={<ViewSettings />} />
    <Route path='salesReport' element={<SalesReport />} />
    <Route path='notifications' element={<Notifications />} />
    <Route path='/chat/:contact?' element={<Chat socket={socket} />} />
    <Route path='/doctors' element={<ViewDoctors />} />
  </Routes>

  return (
    <Outline style={{ backgroundColor: "blue" }} outlet={outlet} items={sidebarItems} socket={socket} />
  );
}

export default PharmacistApp;





// const { data: notifs, isFetching: isFetchingNotifs } = useFetchNotificationQuery();

// const [notifications, setNotifications] = useState([]);



// useEffect(() => {
//   if (!isFetchingNotifs) {
//     const notif = notifs.notifications
//       .filter((notification) => notification != null)
//       .map((notification, index) => notification.content);
//     setNotifications(notif);

//     console.log(notifs);
//   }
// }, [isFetchingNotifs]);

// useEffect(() => {
//   const handleReceiveNotification = ({ content }) => setNotifications((prev) => [...prev, content]);

//   // Attach the event listener
//   socket.on("receive_notification_stock", handleReceiveNotification);

// }, [socket]);

// let content = '';
// if(!isFetchingNotifs){
// content = notifications.map((notif, index) => {
//   return <div key={index}>
//     {notif}
//   </div>
// })
// }







