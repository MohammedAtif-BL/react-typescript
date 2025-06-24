import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Checkbox,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Typography
} from '@mui/material';

type formData = {
  name:string;
  age:number;
  gender:string;
  country:string;
  hobbies:string[];
}

const hobbyOptions = ["Reading","Gaming","Traveling","Coding"];

const App = () => {
  const [form,setForm] =useState<formData>({
      name:'',
      age:18,
      gender:'male',
      country:'',
      hobbies:[],
  });

  const handleSubmit = () => {
    console.log(form);    
  }

  const handleChange = (event:any) =>{
    console.log(event.target.value);
    const {name,type,checked,value} =event.target;
    setForm((prev) => ({
      ...prev,[name]:type === 'checkbox'? checked: value,
    }))    
  }

  const handleSliderChange =(_:Event,value: number)=>{
      setForm((prev)=> ({...prev, age:value as number}))
  }

  const handleSelectChange = (event:any) =>{
      setForm((prev)=> ({...prev, country: event.target.value as string}))
  }

  const handleHobbyChange = (hobby: string) =>{
    setForm((prev) => {
      const newHobbies = prev.hobbies.includes(hobby)
      ? prev.hobbies.filter((h) => h !== hobby)
      : [...prev.hobbies,hobby];
      return {...prev, hobbies:newHobbies};
    })
  }


  return(
    <Box sx={{maxWidth: 500, mx: 'auto', p:3}}>
      <Typography variant='h5' gutterBottom>
        Data Binding
      </Typography>

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={form.name}
        sx={{mb:2}}
        onChange={handleChange}
      />

      <Box sx={{mb:2}}>
        <FormLabel>Age: {form.age}</FormLabel>
        <Slider value={form.age} min={18} max={100} onChange={handleSliderChange}/>
      </Box>

      <FormControl component="fieldset" sx={{mb:2}}>
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          row
          name='gender'
          value={form.gender}
          onChange={handleChange}
        >
          <FormControlLabel value="male" control={<Radio/>} label="Male"/>
          <FormControlLabel value="female" control={<Radio/>} label="Female"/>
          <FormControlLabel value="other" control={<Radio/>} label="other"/>

        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" sx={{mb:2}}>
        <FormLabel> Hobbies</FormLabel>
          <FormGroup row>
            {hobbyOptions.map((hobby) => (
              <FormControlLabel
                key={hobby}
                control={
                  <Checkbox
                    checked={form.hobbies.includes(hobby)}
                    onChange={()=> handleHobbyChange(hobby)}
                  />
                }
                label={hobby}
              />
            ))}
          </FormGroup>
      </FormControl>

      <FormControl fullWidth sx={{mb:3}}>
        <FormLabel>Country</FormLabel>
            <Select
              displayEmpty
              value={form.country}
              onChange={handleSelectChange}
            >
              <MenuItem value="">Select Country</MenuItem>
              <MenuItem value="india">India</MenuItem>
              <MenuItem value="usa">USA</MenuItem>
              <MenuItem value="uk">UK</MenuItem>
              <MenuItem value="germany">Germany</MenuItem>

            </Select>
      </FormControl>
      <Button variant='contained' fullWidth onClick={handleSubmit}>Submit</Button>
    </Box>
  )
}

export default App;
