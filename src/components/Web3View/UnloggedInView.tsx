import { useWeb3Auth } from "@/context/web3AuthContext";

const unloggedInView = () => {
  const { login } = useWeb3Auth();
  return (
    <button onClick={login} className="card">
      Login
    </button>
  );
};

export default unloggedInView;
