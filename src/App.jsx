import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import { Button, TextField } from "@mui/material";

function App() {
  const defaultValues = {
    userData: {
      name: "",
      birthday: "2023-05-30",
    },
  };

  const schema = yup.object({
    userData: yup.object().shape({
      name: yup.string().required(),
      birthday: yup.date().required(),
    }),
  });

  const {
    handleSubmit,
    control,
    register,
    getValues,
    formState: { errors: formErrors },
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", flexDirection: "column", width: 250, rowGap: 15 }}>
          <div>
            <TextField label="Name" {...register("userData.name", { required: true })} fullWidth />
          </div>
          <div>
            <Controller
              control={control}
              rules={{ required: true }}
              name="userData.birthday"
              render={({ field }) => <DatePicker ref={field.ref} label="Birthday" onChange={field.onChange} value={new Date(field.value)} format="yyyy-MM-dd" />}
            />
          </div>
        </div>
        <Button sx={{ mt: 3 }} variant="contained" fullWidth type="submit">
          Submit Data
        </Button>
      </form>
      <div className="mt-4">
        {Object.keys(formErrors)?.map((error, index) => (
          <p style={{ marginTop: 25 }} key={index}>
            * {formErrors?.[error]?.message}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
