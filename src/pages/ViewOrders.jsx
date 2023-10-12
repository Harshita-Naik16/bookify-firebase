import React, { useEffect, useState } from "react";
import { useFirebase } from "../store/firebase";
import BookCard from "../components/Card";
import Alert from "react-bootstrap/Alert";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  const firebase = useFirebase();

  useEffect(() => {
    if (firebase.isLoggedIn) {
      firebase.getOrder().then((orders) => setOrders(orders));
    }
  }, [firebase.isLoggedIn]);

  return (
    <div className="container mt-5 d-flex flex-wrap justify-content-center gap-3">
      {firebase.isLoggedIn ? (
        orders.length > 0 ? (
          orders.map((order) => {
            const data = order.data();

            return (
              <BookCard
                key={data.id}
                id={data.id}
                data={data}
                btn={"View Orders"}
                path={`/book/view/order-detail/${order.id}`}
              />
            );
          })
        ) : (
          <Alert variant={"warning"} className="mx-auto">
            <Alert.Link href="/book/list">List</Alert.Link> books to view orders
          </Alert>
        )
      ) : (
        <Alert variant={"warning"} className="mx-auto">
          <Alert.Link href="/login">Login</Alert.Link> to View Orders
        </Alert>
      )}
    </div>
  );
};
export default ViewOrders;
