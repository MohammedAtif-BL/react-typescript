import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm, { type FormData } from "../components/UserForm";
import { Snackbar, Alert, Box } from "@mui/material";
import { addUser } from "../service/userService";

const UserFormPage = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (data: FormData) => {
    try {
      await addUser(data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Failed to add users:", error);
        });

      setOpenSnackbar(true);

      setTimeout(() => navigate("/users"), 1500);
    } catch (err) {
      console.error("Error submitting form", err);
      // Optionally add error snackbar
    }
  };

  return (
    <Box>
      <UserForm onSubmit={handleSubmit} showCancel />
      <Snackbar open={openSnackbar} autoHideDuration={2000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          User added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserFormPage;
