import React, { useEffect, useState } from "react";
import { useFirebase } from "../store/firebase";
import BookCard from "../components/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Home = () => {
  const [bookList, setBookList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [back, setBack] = useState(false);

  const firestore = useFirebase();

  useEffect(() => {
    firestore.getBookList().then((books) => {
      setBookList(books.docs);
      setFilterList(books.docs);
    });
  }, []);

  const handlefilter = (e) => {
    e.preventDefault();
    const result = bookList.filter((doc) => {
      const { name } = doc.data();
      return name.toLowerCase().includes(searchVal.toLowerCase());
    });
    setFilterList(result);
    setBack(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-muted fw-light text-center mb-5 border border-secondary-subtle p-4">
        Buy And Sell Books Online With <strong>Bookify</strong>
      </h1>
      <div className="mb-5 d-flex justify-content-center">
        {back && (
          <Button
            onClick={() => {
              setFilterList(bookList);
              setBack(false);
              setSearchVal("");
            }}
            variant="outline-primary"
          >
            Back
          </Button>
        )}
        <Form onSubmit={(e) => handlefilter(e)} className="mx-3 d-flex">
          <Form.Control
            type="text"
            placeholder="Search books.."
            className=""
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
              if (searchVal == "") {
                setFilterList(bookList);
              }
            }}
          />
          <Button
            type="submit"
            className="mx-3"
            onClick={(e) => handlefilter(e)}
          >
            Search
          </Button>
        </Form>
      </div>
      <div className="d-flex gap-3 flex-wrap justify-content-center">
        {filterList.map((book) => {
          return (
            <BookCard
              key={book.id}
              data={book.data()}
              btn={"View Details"}
              path={`/book/view/${book.id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
