import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'

const RestraurantList = () => {
  const [list, setList] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/restraurant")
      .then((response) => response.json())
      .then((result) => setList(result));
  }, []);
  return (
    <div>
      <h1>Restraurant List</h1>

      {
        list ? (
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



                {
                  list.map((item, i) =>

                    <tr>
                      <td> {item.id} </td>
                      <td> {item.name} </td>
                      <td> {item.email} </td>
                      <td> {item.rating}  </td>
                      <td> {item.address}  </td>

                    </tr>

                  )
                }

              </tbody>
            </Table>
          </div>) :
          <p>please wait</p>


      } </div>
  );
};

export default RestraurantList;
