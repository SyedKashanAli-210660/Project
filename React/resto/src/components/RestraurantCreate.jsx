import React, { useState, useRef } from 'react';
import "./create.css";

const RestraurantCreate = () => {
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  const [state, setState] = useState({
    id: '',
    name: '',
    email: '',
    rating: '',
    address: ''
  });

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const create = () => {
    fetch("http://localhost:3000/restraurant")
    .then((response) => response.json())
    .then((restaurants) => {
      const restaurantExists = restaurants.some(
        (restaurant) =>
          restaurant.id === state.id || restaurant.name === state.name
      );

      if (restaurantExists) {
        alert("Restaurant with the same ID or name already exists.");
      } else {
        fetch("http://localhost:3000/restraurant", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(state)
        })
          .then((response) => response.json())
          .then(() => {
            alert("Restaurant Added Successfully");
            setState({
              id: '',
              name: '',
              email: '',
              rating: '',
              address: ''
            });
          });
      }
    });
};
  return (
    <div style={{ fontSize: "13px" }}>
      <h1>Restaurant Create</h1>
      <div>
        <input
          name="id"
          value={state.id}
          onChange={handleChange}
          placeholder="Restaurant Id"
        /> <br /><br />
        <input
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Restaurant Name"
        /> <br /><br />
        <input
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Restaurant Email"
        /> <br /><br />
        <input
          name="rating"
          value={state.rating}
          onChange={handleChange}
          placeholder="Restaurant Rating"
        /> <br /><br />
        <input
          name="address"
          value={state.address}
          onChange={handleChange}
          placeholder="Restaurant Address"
        /> <br /><br />

        <div className="image-upload-container">
          <div className="box-decoration">
            <label htmlFor="image-upload-input" className="image-upload-label">
              {image ? image.name : "Choose an image"}
            </label>
            <div onClick={handleClick} style={{ cursor: "pointer", textAlign: "center" }}>
              {image ? (
                <img src={URL.createObjectURL(image)} alt="upload image" className="img-display-after" />
              ) : (
                <img src="./uploadimage.jpeg" alt="upload image" className="img-display-before" />
              )}
              <input
                id="image-upload-input"
                type="file"
                onChange={handleImageChange}
                ref={hiddenFileInput}
                style={{ display: "none" }}
              />
            </div>

            <button
              className="image-upload-button"
              onClick={handleClick}
            >
              Upload Image
            </button>
          </div>
        </div>
      </div>
      <br />
      <button onClick={create} style={{ fontSize: 20, fontWeight: 'bold' }}>Add Restaurant</button>
    </div>
  );
};

export default RestraurantCreate;
