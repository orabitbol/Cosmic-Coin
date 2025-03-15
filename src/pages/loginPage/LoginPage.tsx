import { motion } from "framer-motion";
import "./loginPage.scss";
import Login from "../../component/login/Login";


const LoginPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Login />
    </motion.div>
  );
};

export default LoginPage;
