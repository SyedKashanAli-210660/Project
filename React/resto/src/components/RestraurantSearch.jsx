import React, { useState, useEffect } from 'react';
import { InputGroup, Form, Table } from 'react-bootstrap';

const RestraurantSearch = () => {
  const [search, setSearch] = useState('');
  const [list, setList] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/restraurant")
      .then((response) => response.json())
      .then((result) => setList(result));
  }, []);

  const searchLower = search.toLowerCase();

  return (
    <div>
      <h1>Restraurant Search</h1>
      <Form>
        <InputGroup>
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </InputGroup>
      </Form>
      {list ? (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {list.filter((item) => {
                const itemName = item && item.name ? item.name.toLowerCase() : '';
                return searchLower === '' ? true : itemName.includes(searchLower);
              })
                .map((item, i) => (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.rating}</td>
                    <td>{item.address}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p>Please wait</p>
      )}
    </div>
  );
};

export default RestraurantSearch;
