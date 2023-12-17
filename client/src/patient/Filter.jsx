import React, { useState } from "react";
import ProductCard from "../shared/components/Card";
// import "./style.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Button } from "@mui/material";
import TempDrawer from "../shared/components/Drawer";
import {
  useAddToCartMutation,
  useGetPatientQuery,
  useRemoveFromCartMutation,
} from "../store";
import LoadingIndicator from "../shared/components/LoadingIndicator";

const Filter = ({ medicines }) => {
  const [selectedMedicinalUse, setSelectedMedicinalUse] = useState("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [cart, setCart] = useState([]);

  console.log("all medicines", medicines);

  const { data: patient, isFetching, error } = useGetPatientQuery();

  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  if (isFetching) return <LoadingIndicator />;
  console.log("patient: ", patient);
  let cart = patient?.cart || [];

  cart = cart.map((cartItem) => {
    const { medicine, quantity } = cartItem;

    return {
      name: medicine.name,
      price: medicine.price,
      description: medicine.description,
      medicineImage: medicine.medicineImage,
      quantity,
    };
  });

  const filterMedicinesByMedicinalUse = (medicinalUse) => {
    setSelectedMedicinalUse(medicinalUse);
  };

  const filteredArray = medicines.filter((medicine) => {
    return (
      medicine.medicinalUse === selectedMedicinalUse ||
      selectedMedicinalUse === "all"
    );
  });

  // const mappedOrders = cart.map((cartItem, index) => (
  //   <OrderCard key={index} cartItem={cartItem} />
  // ));

  const handleAddToCart = (medicine) => {
    // if (medicine.quantity > 0) {
    //   const updatedCart = [...cart];

    //   const existingItem = updatedCart.find((item) => item.name === medicine.name);

    //   if (existingItem) {
    //     existingItem.quantity += 1;
    //   } else {
    //     const newItem = {
    //       name: medicine.name,
    //       price: medicine.price,
    //       quantity: 1,
    //     };
    //     updatedCart.push(newItem);
    //   }

    // }
    // console.log(medicine);
    addToCart({
      name: medicine.name,
    });
  };

  const handleQuantityInc = (medicine) => {
    // const updatedCart = [...cart];
    // const toChange = updatedCart.find((item) => item.name === medicine.name);

    // if (toChange) {
    //   toChange.quantity++;
    // }
    // setCart(updatedCart);
    // console.log("new quantity of ", medicine.name, "is: ", medicine.quantity);

    addToCart({
      name: medicine.name,
    });
  };

  const handleQuantityDec = (medicine) => {
    // const updatedCart = [...cart];
    // const toChange = updatedCart.find((item) => item.name === medicine.name);

    // if (toChange) {
    //   toChange.quantity--;
    // }
    // setCart(updatedCart);
    // console.log("new quantity of ", medicine.name, "is: ", medicine.quantity);

    removeFromCart({
      name: medicine.name,
      quantity: 1,
    });
  };

  const handleDeleteItem = (medicine) => {
    // new cart without the removed med
    // const updatedCart = cart.filter((item) => item.name !== medicine.name);
    // setCart(updatedCart);

    removeFromCart({
      name: medicine.name,
      quantity: medicine.quantity,
    });
  };

  const handleCartIcon = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const arr = [];
  for (let i = 0; i < patient.prescriptions.length; i++) {
    for (let j = 0; j < patient.prescriptions[i].medicines.length; j++) {
      arr.push(patient.prescriptions[i].medicines[j].medicine.name);
    }
  }

  // medicine

  const mappedArray = filteredArray.map((medicine) => {
    if (!medicine.isOverTheCounter) return null;
    console.log("medicine: ", medicine);
    return (
      <ProductCard
        name={medicine.name}
        description={medicine.description}
        price={medicine.price}
        sales={medicine.sales}
        quantity={medicine.quantity}
        medicinalUse={medicine.medicinalUse}
        mainActiveIngredient={medicine.activeIngredients[0]}
        onAddToCart={() => {
          handleAddToCart(medicine);
        }}
        medicineImage={medicine.medicineImage}
        similarMedicines={filteredArray}
        isOverTheCounter={medicine.isOverTheCounter}
        isPrescribed={arr.includes(medicine.name)}
        //healthPackage={patient.clinicPatient.healthPackage}
      />
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-end">
        <button
          className="bg-white text-black mb-2 rounded-3xl"
          onClick={handleCartIcon}
        >
          <ShoppingCartOutlinedIcon />
          Cart
        </button>
      </div>

      <div className="flex flex-row justify-center gap-x-2">
        <button
          className={`btn ${
            selectedMedicinalUse === "all" ? "bg-sky-900 text-black" : ""
          } bg-white text-black mb-2 rounded-3xl hover:bg-sky-900 hover:text-white`}
          onClick={() => filterMedicinesByMedicinalUse("all")}
        >
          Show all
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Antiviral" ? "bg-sky-900 text-black" : ""
          } bg-white text-black mb-2 rounded-3xl hover:bg-sky-900 hover:text-white`}
          onClick={() => filterMedicinesByMedicinalUse("Antiviral")}
        >
          Antiviral
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Antifungal" ? "bg-sky-900 text-black" : ""
          } bg-white text-black mb-2 rounded-3xl hover:bg-sky-900 hover:text-white`}
          onClick={() => filterMedicinesByMedicinalUse("Antifungal")}
        >
          Antifungal
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Antipyretic"
              ? "bg-sky-900 text-black"
              : ""
          } bg-white text-black mb-2 rounded-3xl hover:bg-sky-900 hover:text-white`}
          onClick={() => filterMedicinesByMedicinalUse("Antipyretic")}
        >
          Antipyretic
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Pain Reliever"
              ? "bg-sky-900 text-black"
              : ""
          } bg-white text-black mb-2 rounded-3xl hover:bg-sky-900 hover:text-white`}
          onClick={() => filterMedicinesByMedicinalUse("Pain Reliever")}
        >
          Pain Reliever
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Antibiotic" ? "bg-sky-900 text-black" : ""
          } bg-white text-black mb-2 rounded-3xl hover:bg-sky-900 hover:text-white`}
          onClick={() => filterMedicinesByMedicinalUse("Antibiotic")}
        >
          Antibiotic
        </button>

        <button
          className={`btn ${
            selectedMedicinalUse === "Antiseptic" ? "bg-sky-900 text-black" : ""
          } bg-white text-black mb-2 rounded-3xl hover:bg-sky-900 hover:text-white`}
          onClick={() => filterMedicinesByMedicinalUse("Antiseptic")}
        >
          Antiseptic
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Antispasmodic"
              ? "bg-sky-900 text-black"
              : ""
          } bg-white text-black mb-2 rounded-3xl hover:bg-sky-900 hover:text-white`}
          onClick={() => filterMedicinesByMedicinalUse("Antispasmodic")}
        >
          Antispasmodic
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Antihistamine"
              ? "bg-sky-900 text-black"
              : ""
          } bg-white text-black mb-2 rounded-3xl hover:bg-sky-900 hover:text-white`}
          onClick={() => filterMedicinesByMedicinalUse("Antihistamine")}
        >
          Antihistamine
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Anti-inflammatory"
              ? "bg-sky-900 text-black"
              : ""
          } bg-white text-black mb-2 rounded-3xl hover:bg-sky-900 hover:text-white`}
          onClick={() => filterMedicinesByMedicinalUse("Anti-inflammatory")}
        >
          Anti-inflammatory
        </button>
        <button
          className={`btn ${
            selectedMedicinalUse === "Diuretic" ? "bg-sky-900 text-black" : ""
          } bg-white text-black mb-2 rounded-3xl hover:bg-sky-900 hover:text-white`}
          onClick={() => filterMedicinesByMedicinalUse("Diuretic")}
        >
          Diuretic
        </button>
      </div>
      <div className="grid grid-cols-4">{mappedArray}</div>

      <TempDrawer
        isOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
        cartItems={cart}
        onDeleteItem={handleDeleteItem}
        onQuantityInc={handleQuantityInc}
        onQuantityDec={handleQuantityDec}
        medicines={medicines}
      />
    </div>
  );
};

export default Filter;
