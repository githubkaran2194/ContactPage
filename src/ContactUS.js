import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box, Container, TextField, Typography } from "@mui/material";

const ContactUS = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    message: ""
  });

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  };

  const formStyle = {
    padding: "30px",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#ffffff"
  };

  const inputStyle = {
    margin: "10px 0"
  };

  const buttonStyle = {
    margin: "20px 0 10px",
    backgroundColor: "#079481",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#45a049"
    }
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#138fff",
    fontSize: "40px",
    fontFamily: "sans",
    fontWeight: "bold"
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      user.name.trim() === "" ||
      user.email.trim() === "" ||
      user.message.trim() === ""
    ) {
      setError({
        name: "All Fields are required",
        email: "All Fields are required",
        message: "All Fields are required"
      });
      alert("All Fields are required");
    } else {
      try {
        const response = await fetch(
          "https://api-fetch-31f0a-default-rtdb.firebaseio.com/contact.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }

      setUser({
        name: "",
        email: "",
        message: ""
      });
    }
  };

  return (
    <Container maxWidth="xs" style={containerStyle}>
      <Box component="form" sx={formStyle} onSubmit={handleSubmit}>
        <Typography variant="h5" style={headingStyle}>
          Contact Us
        </Typography>
        <TextField
          name="name"
          label="Your Name"
          fullWidth
          value={user.name}
          size="small"
          onChange={handleInput}
          style={inputStyle}
          error={error.name !== ""}
          helperText={error.name ? error.name : ""}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          value={user.email}
          size="small"
          onChange={handleInput}
          style={inputStyle}
          error={error.email !== ""}
          helperText={error.email ? error.email : ""}
        />
        <TextField
          name="message"
          label="Message"
          fullWidth
          value={user.message}
          size="small"
          onChange={handleInput}
          multiline
          rows={3}
          style={inputStyle}
          error={error.message !== ""}
          helperText={error.message ? error.message : ""}
        />
        <Button type="submit" variant="contained" style={buttonStyle}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default ContactUS;
