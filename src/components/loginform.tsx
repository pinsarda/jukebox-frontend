import React from "react";
import {Form, Input, Button} from "@heroui/react";
import { ValidationErrors } from "@react-types/shared";
import { useNavigate } from "react-router-dom";

type UserData = {
    username: String,
    password: String
}

async function login(user_data:UserData) {
  const res = await fetch("/api/user/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(user_data)
  });
  return res
}

export default function LoginForm() {
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState<UserData | null>(null);
  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const navigate = useNavigate();

  const onSubmit = (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user_data = {
        username: formData.get('username') as string,
        password: formData.get('password') as string
    };

    // Custom validation checks
    const newErrors: ValidationErrors = {};

    // Username validation
    if (user_data.username === "admin") {
      newErrors.name = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    // Clear errors and submit
    setErrors({});

    login(user_data).then((result) => {
      if (!result.ok) {
        setErrors({name: "Nom d'utilisateur ou mot de passe incorrect"})
      } else {
        localStorage.setItem('is_authenticated', 'true');
        navigate('/');
      }
    });
    
  };

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      validationErrors={errors}
      onReset={() => setSubmitted(null)}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 w-full">
        <Input
          isRequired
          errorMessage={({validationDetails}) => {
            if (validationDetails.valueMissing) {
              return "Please enter your name";
            }

            return errors.name;
          }}
          label="Name"
          labelPlacement="outside"
          name="username"
          placeholder="Enter your name"
        />

        <Input
          isRequired
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onValueChange={setPassword}
        />

        {errors.name && <span className="text-danger text-small">{errors.name}</span>}

        <div className="flex gap-4 ">
          <Button className="w-full" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </div>

      {submitted && (
        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}

