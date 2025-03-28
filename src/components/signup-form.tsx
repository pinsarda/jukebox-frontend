import React from "react";
import { Form, Input, Button } from "@heroui/react";
import { ValidationErrors } from "@react-types/shared";
import { useNavigate } from "react-router-dom";

import { login, signup } from "@/api-wrapper";

export default function SignupForm() {
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const navigate = useNavigate();

  const onSubmit = (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const user_data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    setErrors({});

    signup(user_data).then((result) => {
      if (!result.ok) {
        setErrors({ name: "Nom d'utilisateur indisponible" });
        setLoading(false);
      } else {
        login(user_data);
        navigate("/");
      }
    });
  };

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      validationErrors={errors}
      onReset={() => setLoading(false)}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 w-full">
        <Input isRequired label="Nom d'utilisateur" name="username" />

        <Input
          isRequired
          label="Mot de passe"
          name="password"
          type="password"
          value={password}
          onValueChange={setPassword}
        />

        {errors.name && (
          <span className="text-danger text-small">{errors.name}</span>
        )}

        <div className="flex gap-4 ">
          <Button
            className="w-full h-14 text-medium"
            color="primary"
            isLoading={loading}
            type="submit"
          >
            Créer un compte
          </Button>
        </div>
      </div>
    </Form>
  );
}
