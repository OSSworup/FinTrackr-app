import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../../components/components/axios";

function Login() {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const { login } = useContext(AuthContext);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const res =await api.post('/user/login', data);
      login(res.data.token);
      navigate('/dashboard');
      reset();
    } catch (error) {
      console.log(error);
      setApiError(error.response?.data.error || "server Error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4">
      <div className="bg-white border border-green-700 shadow-md rounded-md w-full max-w-md p-6 space-y-5">
        <h2 className="text-2xl font-bold text-center text-green-700">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-blue-700"
              } p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-700`}
            />
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-blue-700"
              } p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-700`}
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-900 transition"
          >
            Login
          </button>

          {apiError && <p className="text-red-600 text-center text-sm">{apiError}</p>}
          
          <p className="text-center text-gray-700 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-700 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;