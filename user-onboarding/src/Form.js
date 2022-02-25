import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";

function Form() {
  const [post, setPost] = useState([]);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    website: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    terms: "",
  });

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: Yup.string()
      .email("Must be a valid email address.")
      .required("Must include email address."),
    password: Yup.string()
      .required("Password is Required")
      .min(6, "Passwords must be at least 6 characters long."),
    terms: Yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    Yup.reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("submitted!");
    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        setPost(res.data); // get just the form data from the REST api
        console.log("success", res);
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <form>
      <label htmlFor="nameInput">
        Name
        <input
          id="nameInput"
          type="text"
          name="name"
          placeholder="Name"
          onChange={inputChange}
        />
      </label>
      {errors.email.length > 0 && <p className="error">{errors.email}</p>}
      <label htmlFor="emailInput">
        Email
        <input
          id="emailInput"
          type="email"
          name="email"
          placeholder="Email"
          onChange={inputChange}
        />
      </label>
      {errors.email.length > 0 && <p className="error">{errors.email}</p>}
      <label htmlFor="passwordInput">
        Password
        <input
          id="passwordInput"
          type="password"
          name="password"
          placeholder="Password"
          onChange={inputChange}
        />
      </label>
      {errors.password.length > 0 && <p className="error">{errors.password}</p>}
      <label htmlFor="termsInput">
        Do you agree to the terms and conditions?
        <input id="termsInput" type="checkbox" name="terms" />
      </label>
      <button id="submit" onClick={formSubmit}>
        Submit!
      </button>
    </form>
  );
}

export default Form;
