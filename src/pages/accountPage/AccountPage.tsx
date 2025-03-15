import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { userStore } from "../../store/userStore";
import "./accountPage.scss";
import Account from "../../component/account/Account";

const AccountPage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userStore.user) {
      navigate("/login");
    }
  }, [userStore.user, navigate]);

  return <Account />;
});

export default AccountPage;
