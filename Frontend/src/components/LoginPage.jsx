import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { getToken, saveUser } from "../api/auth";

const LoginPage = () => {
  const { loginUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();

      const dbResponse = await saveUser(result?.user);

      await getToken(result?.user?.email);
      navigate("/");
      toast.success("Login Successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await loginUser(email, password);

      await getToken(result?.user?.email);
      if (location.state === null) {
        navigate("/");
      } else {
        navigate(`${location.state}`);
      }
      toast.success("Login Successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <div>
      <div>
        <div className="hero min-h-screen  ">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-white ">Login now!</h1>
            </div>
            <div className="bg-blue-300  rounded-lg text-black card flex-shrink-0 w-full max-w-sm shadow-2xl ">
              <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered text-white"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered text-white"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
                <p>
                  Create an Account..{" "}
                  <Link to="/sign-up">
                    <span className="cursor-pointer text-blue-600">
                      Register Now
                    </span>
                  </Link>
                </p>
              </form>
              <div className="flex mx-auto p-4">
                <button onClick={handleGoogleLogin} className="btn btn-ghost">
                  Continue with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
