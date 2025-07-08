import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { type FormData } from "../components/UserForm";
import UserTable from "../components/UserTable";
import { useEffect, useState } from "react";
import { getAllUsers } from "../service/userService";

const UserTablePage = () => {
  const [users, setUsers] = useState<FormData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        console.log(response);

        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Button variant="contained" onClick={() => navigate("/add-user")}>
        Add User
      </Button>
      <UserTable users={users} />
    </Box>
  );
};

export default UserTablePage;
