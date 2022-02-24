import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";

function Form() {
  const [users, setUsers] = useState([]);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    terms: Yup.boolean()
      .oneOf([true], "You must agree to the terms")
      .required("You must agree to the terms"),
  });

  const handleChange = (e) => {
    e.persist();
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckbox = (e) => {
    e.persist();
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.checked,
    });
  };

  const handleBlur = (e) => {
    e.persist();
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formValues)
      .then((response) => {
        console.log(response);
        setUsers([...users, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formValues.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formValues.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formValues.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="terms">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            checked={formValues.terms}
            onChange={handleCheckbox}
          />
          I agree to the terms
        </label>
        {errors.terms && <p>{errors.terms}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
