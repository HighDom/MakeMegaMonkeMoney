import { useWeb3Auth } from "@/context/useWeb3Auth";

const UnloggedInView = () => {
  const { login } = useWeb3Auth();
  return (
    <button onClick={login} className="card">
      Login
    </button>
  );
};

export default UnloggedInView;
