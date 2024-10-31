'use client'
import { ILoginRequest } from "@/app/core/application/dto";
import { FormField } from "@/ui/molecules";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  userName: yup
    .string()
    .email("El correo es inválido")
    .required("El correo el obligatorio"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener  al menos 8  caracteres")
    .required("La contraseña es obligatoria"),
});

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginRequest>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(loginSchema),
  });
  
  const handleLogin = (data: ILoginRequest) => {
    console.log(data)
  }

  return (
    <form className="w-full max-w-sm p-4 mx-auto space-y-4" onSubmit={handleSubmit(handleLogin)}>
      <h2 className="text-2xl font-semibold text-center">Iniciar Sesión</h2>

      <FormField<ILoginRequest>
        control={control}
        type="email"
        label="Correo Electrónico"
        name="userName"
        error={errors.userName}
        placeholder="Ingresa tu correo"
      />
      
      <FormField<ILoginRequest>
        control={control}
        type="password"
        label="Contraseña"
        name="password"
        error={errors.password}
        placeholder="Ingresa tu contraseña"
      />
      <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        Iniciar Sesión
      </button>
    </form>
  );
};