import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { dayMonthYearFormat } from "../lib/helper";

const Purchase = ({ order }) => {
  const [completed, setCompleted] = useState(false);

  const data = order.data();
  const date = new Date(data.placedOn.seconds * 1000);
  const dayName = dayMonthYearFormat(date);

  useEffect(() => {
    setCompleted(data.confirmed);
  }, []);

  return (
    <div className="custom-md-container d-flex mx-auto mt-2  align-items-sm-center justify-content-between border p-3 flex-column flex-sm-row">
      <div>
        <p>Item: {data.bookName}</p>
        <h6>Sold By: {data.soldBy}</h6>
        <p>Quantity: {data.qty}</p>
        <p>Purchased On: {dayName}</p>
        <p>Deliver To: {data.address}</p>
      </div>
      {completed ? (
        <Button variant="outline-success" disabled>
          order accepted
        </Button>
      ) : (
        <Button variant="outline-warning" disabled>
          confirmation pending
        </Button>
      )}
    </div>
  );
};

export default Purchase;
