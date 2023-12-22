import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { imageUpload } from "../api/utils";
import { getToken, saveUser } from "../api/auth";

const RegisterPage = () => {
  const { registerUser, googleLogin, updateUserProfile } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();

      await getToken(result?.user?.email);
      navigate("/");
      toast.success("Sign Up Successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const image = e.target.image.files[0];

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    } else if (!/[A-Z]/.test(password)) {
      return toast.error(
        "Your password should have at least one uppercase character."
      );
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      return toast.error(
        "Your password should contain at least one special character."
      );
    }

    try {
      const imageData = await imageUpload(image);

      const result = await registerUser(email, password);

      await updateUserProfile(name, imageData?.data?.display_url);

      // const dbResponse = await saveUser(result?.user);

      await getToken(result?.user?.email);

      if (location.state === null) {
        navigate("/");
      } else {
        navigate(`${location.state}`);
      }
      toast.success("Sign Up Successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <div>
      <div>
        <div className="hero min-h-screen max-w-6xl mx-auto">
          <div className="hero-content flex-col lg:flex-row">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold ">Register now!</h1>
            </div>
            <div className="bg-blue-300 card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text  text-black">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text  text-black">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text  text-black">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <div>
                    <label
                      htmlFor="image"
                      className=" text-black block mb-2 text-sm"
                    >
                      Select Image:
                    </label>
                    <input
                      className="file-input w-full max-w-xs bg-blue-800 text-white"
                      required
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                    />
                  </div>
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary">Register</button>
                </div>
                <p className=" text-black">
                  Already have an Account?..{" "}
                  <Link to="/login">
                    <span className="cursor-pointer text-blue-600">
                      Login Now
                    </span>
                  </Link>
                </p>
              </form>

              <div className="flex mx-auto p-4  text-black">
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

export default RegisterPage;
