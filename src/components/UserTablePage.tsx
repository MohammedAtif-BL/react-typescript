import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../service/userService";

export type FormData = {
  emp_id?: number;
  name: string;
  gender: string;
  profilePic: string;
  dept: string[];
  startDate: string;
  salary: number;
  note: string;
};

const UserTablePage = () => {
  const [users, setUsers] = useState<FormData[]>([]);
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    console.log("Emp Id to Delete: ", id);

    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id)
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.emp_id !== id)
          );
        })
        .catch((error) => {
          console.error("Delete failed:", error);
        });
    } else {
      alert("Employee not deleted");
    }
  };

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        console.log(response.data.data);

        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, p: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Users</Typography>
        <Button variant="contained" onClick={() => navigate("/add-user")}>
          Add User
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Departments</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    {user.profilePic.charAt(0).toUpperCase()}
                  </Avatar>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.dept.join(", ")}</TableCell>
                <TableCell>{user.startDate}</TableCell>
                <TableCell>₹{user.salary.toLocaleString()}</TableCell>
                <TableCell>{user.note}</TableCell>
                <TableCell>
                  <EditIcon
                    onClick={() => navigate(`/edit-user/${user.emp_id}`)}
                    sx={{ mr: 1, cursor: "pointer", color: "primary.main" }}
                  />
                  <DeleteIcon
                    onClick={() => {
                      if (user.emp_id !== undefined) {
                        handleDelete(user.emp_id);
                      } else {
                        console.error("User ID is undefined, cannot delete");
                      }
                    }}
                    sx={{ cursor: "pointer", color: "error.main" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default UserTablePage;
