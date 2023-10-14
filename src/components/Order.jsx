import React, { useEffect, useState } from "react";
import { useFirebase } from "../store/firebase";
import Button from "react-bootstrap/Button";
import { dayMonthYearFormat } from "../lib/helper";

const Order = ({ order, bookId }) => {
  const [completed, setCompleted] = useState(false);

  const data = order.data();
  const date = new Date(data.placedOn.seconds * 1000);
  const dayName = dayMonthYearFormat(date);

  const firebase = useFirebase();

  useEffect(() => {
    setCompleted(data.completed);
  }, []);

  const handleAccept = (orderId, customerId) => {
    if (firebase.isLoggedIn) {
      firebase
        .updateOrderStatus(bookId, orderId, customerId)
        .then((res) => setCompleted(true))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="custom-md-container d-flex mx-auto mt-2  align-items-sm-center justify-content-between border p-3 flex-column flex-sm-row">
      <div>
        <p>Order by: {data.displayName}</p>
        <h6>Address: {data.address}</h6>
        <p>Quantity: {data.qty}</p>
        <p>PlacedOn: {dayName}</p>
      </div>
      {completed ? (
        <Button variant="outline-secondary" disabled>
          order accepted
        </Button>
      ) : (
        <Button
          variant="success"
          onClick={() => handleAccept(order.id, data.customerId)}
        >
          Accept
        </Button>
      )}
    </div>
  );
};

export default Order;
