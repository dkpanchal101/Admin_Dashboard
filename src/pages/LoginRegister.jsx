import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";
import Header from "../components/common/Header";

const LoginRegister = () => {
  const [step, setStep] = useState("choice"); // 'choice' | 'login' | 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("auth", "true");
      window.location.href = "/overview";
    } else {
      alert("Invalid credentials");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`User ${registerData.name} registered!`);
    setStep("login");
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 min-h-screen">
      <Header title="Login/Register" />

      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-4">
        <AnimatePresence mode="wait">
          {step === "choice" && (
            <motion.div
              key="choice"
              className="bg-gray-700 p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-white">Welcome</h1>
              <p className="text-gray-400">Choose an option to proceed</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setStep("login")}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center gap-2 text-white"
                >
                  <LogIn className="w-5 h-5" /> Login
                </button>
                <button
                  onClick={() => setStep("register")}
                  className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center gap-2 text-white"
                >
                  <UserPlus className="w-5 h-5" /> Register
                </button>
              </div>
            </motion.div>
          )}

          {step === "login" && (
            <motion.div
              key="login"
              className="divide-gray-700 p-8 rounded-2xl shadow-xl max-w-md w-full"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-indigo-400 mb-6 flex items-center gap-2">
                <LogIn className="w-6 h-6" /> Login
              </h2>
              <form onSubmit={handleLogin} className="space-y-4 ">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-pink-500 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold text-white"
                >
                  Login
                </button>
              </form>
              <p className="text-sm mt-4 text-center text-gray-400">
                New here?{" "}
                <button onClick={() => setStep("register")} className="text-pink-400 hover:underline">
                  Register
                </button>
              </p>
            </motion.div>
          )}

          {step === "register" && (
            <motion.div
              key="register"
              className="bg-[#111827] p-8 rounded-2xl shadow-xl max-w-md w-full"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-pink-400 mb-6 flex items-center gap-2">
                <UserPlus className="w-6 h-6" /> Register
              </h2>
              <form onSubmit={handleRegister} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold text-white"
                >
                  Register
                </button>
              </form>
              <p className="text-sm mt-4 text-center text-gray-400">
                Already have an account?{" "}
                <button onClick={() => setStep("login")} className="text-indigo-400 hover:underline">
                  Login
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginRegister;
