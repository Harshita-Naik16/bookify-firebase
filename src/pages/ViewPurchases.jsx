import React, { useEffect, useState } from "react";
import { useFirebase } from "../store/firebase";
import Purchase from "../components/Purchase";
import Alert from "react-bootstrap/Alert";

const Purchases = () => {
  const [orders, setOrders] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    if (firebase.isLoggedIn) {
      firebase.getPurchasesList().then((res) => setOrders(res.docs));
    }
  }, [firebase.isLoggedIn]);

  return (
    <div className="container mt-5 mx-auto">
      <h1 className="text-muted fw-light text-center mb-5">Purchases</h1>
      <div className="mx-auto">
        {firebase.isLoggedIn ? (
          orders.length > 0 ? (
            orders.map((order) => {
              return <Purchase order={order} key={order.id} />;
            })
          ) : (
            <Alert variant={"warning"} className="mx-auto">
              You have not done any purchases
            </Alert>
          )
        ) : (
          <Alert variant={"warning"} className="mx-auto">
            <Alert.Link href="/login">Login</Alert.Link> to View Orders
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Purchases;
