import { useWeb3Auth } from "@/context/useWeb3Auth";

const unloggedInView = () => {
  const { login } = useWeb3Auth();
  return (
    <button onClick={login} className="card">
      Login
    </button>
  );
};

export default unloggedInView;
