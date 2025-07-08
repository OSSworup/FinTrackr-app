import { useContext,useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate} from "react-router-dom";
import api from "../../components/components/axios";

function Signup() {
  const {register,formState: { errors },handleSubmit,reset,} = useForm();
  const {login}=useContext(AuthContext);
  const [apiError,setApiError]=useState(null);
  const navigate=useNavigate();

  async function onSubmit(data) {
    try{
      console.log(data);
      const res=await api.post('/user/signup',data);
      login(res.data.token);
      navigate('/login');
      reset();
    }catch(error){
      console.log(error);
      setApiError(error.response?.data.error || "server error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-green-700 shadow-md rounded-md w-full max-w-md p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-green-700">Create an Account</h2>

        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
            className={`w-full border ${
              errors.name ? "border-red-500" : "border-blue-700"
            } p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-700`}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

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
          Signup
        </button>
        {apiError && <p className="text-red-600 text-center">{apiError}</p>}
        <p className="text-center text-gray-700 mt-4">
          Already have an account? <Link to="/login" className="text-green-700 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;