import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../store/firebase";
import Order from "../components/Order";
import { sortByDate } from "../lib/helper";

const ViewOrderDetail = () => {
  const [orders, setOrders] = useState([]);

  const params = useParams();

  const firebase = useFirebase();

  useEffect(() => {
    firebase.getOrderDetail(params.bookId).then((orders) => {
      let sortOrders = sortByDate(orders);
      setOrders(sortOrders);
    });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-muted fw-light text-center mb-5">Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => {
          return <Order order={order} key={order.id} bookId={params.bookId} />;
        })
      ) : (
        <h3 className="text-center">No orders yet</h3>
      )}
    </div>
  );
};

export default ViewOrderDetail;
