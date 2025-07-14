import {
  Box,
  Button,
  TextField,
  Checkbox,
  MenuItem,
  Radio,
  RadioGroup,
  Slider,
  Select,
  Avatar,
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Male, Female, Person } from "@mui/icons-material";
import { addUser, getUserById, updateUser } from "../service/userService";

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

const departmentOptions = ["HR", "Sales", "Engineering", "Finance"];
const profilePics = [
  {
    label: "Male",
    value: "male",
    icon: (
      <Avatar>
        <Male />
      </Avatar>
    ),
  },
  {
    label: "Female",
    value: "female",
    icon: (
      <Avatar>
        <Female />
      </Avatar>
    ),
  },
  {
    label: "Other",
    value: "other",
    icon: (
      <Avatar>
        <Person />
      </Avatar>
    ),
  },
];

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const years = Array.from({ length: 50 }, (_, i) => (2025 - i).toString());

const UserFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [form, setForm] = useState<FormData>({
    name: "",
    gender: "male",
    profilePic: "male",
    dept: [],
    startDate: "",
    salary: 30000,
    note: "",
  });

  useEffect(() => {
    if (isEdit) {
      getUserById(Number(id))
        .then((res) => {
          const data = res.data;
          setForm(data);
          const [d, m, y] = data.startDate.split("-");
          setDay(d);
          setMonth(m);
          setYear(y);
        })
        .catch((err) => {
          console.error("Failed to fetch user", err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentToggle = (dept: string) => {
    setForm((prev) => {
      const updated = prev.dept.includes(dept)
        ? prev.dept.filter((d) => d !== dept)
        : [...prev.dept, dept];
      return { ...prev, dept: updated };
    });
  };

  const handleSubmit = async () => {
    const startDate = `${day}-${month}-${year}`;
    const completeForm = { ...form, startDate };

    try {
      if (isEdit && completeForm.emp_id) {
        await updateUser(completeForm.emp_id, completeForm);
      } else {
        await addUser(completeForm);
      }

      setOpenSnackbar(true);
      setTimeout(() => navigate("/users"), 1500);
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  if (loading) return <Typography textAlign="center">Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? "Edit User" : "Add New User"}
      </Typography>

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={form.name}
        sx={{ mb: 2 }}
        onChange={handleChange}
      />

      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth>
          <FormLabel>Profile Picture</FormLabel>
          <RadioGroup
            row
            name="profilePic"
            value={form.profilePic}
            onChange={handleChange}
          >
            {profilePics.map((pic) => (
              <FormControlLabel
                key={pic.value}
                value={pic.value}
                control={<Radio />}
                label={pic.icon}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel>Department</FormLabel>
        <FormGroup row>
          {departmentOptions.map((dept) => (
            <FormControlLabel
              key={dept}
              control={
                <Checkbox
                  checked={form.dept.includes(dept)}
                  onChange={() => handleDepartmentToggle(dept)}
                />
              }
              label={dept}
            />
          ))}
        </FormGroup>
      </FormControl>

      <Box sx={{ mb: 2 }}>
        <FormLabel>Start Date</FormLabel>
        <Box display="flex" gap={2}>
          <FormControl fullWidth>
            <Select
              displayEmpty
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <MenuItem value="">Day</MenuItem>
              {days.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select
              displayEmpty
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <MenuItem value="">Month</MenuItem>
              {months.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select
              displayEmpty
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <MenuItem value="">Year</MenuItem>
              {years.map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <FormLabel>Salary: ₹{form.salary}</FormLabel>
        <Slider
          min={10000}
          max={100000}
          step={1000}
          value={form.salary}
          onChange={(_, v) =>
            setForm((prev) => ({ ...prev, salary: v as number }))
          }
        />
      </Box>

      <TextField
        fullWidth
        multiline
        minRows={3}
        name="note"
        label="Note"
        value={form.note}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />

      <Box display="flex" gap={2}>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Submit
        </Button>
        <Button
          variant="outlined"
          fullWidth
          color="secondary"
          onClick={() => navigate("/users")}
        >
          Cancel
        </Button>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={2000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          {isEdit ? "User updated successfully!" : "User added successfully!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserFormPage;
