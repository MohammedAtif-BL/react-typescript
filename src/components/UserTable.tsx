import { type FormData } from "./UserForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  users: FormData[];
};

const UserTable = ({ users }: Props) => {
  return (
    <Paper sx={{ maxWidth: 1000, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Submitted Users
      </Typography>
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
                <EditIcon></EditIcon>
                <DeleteIcon></DeleteIcon>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UserTable;
