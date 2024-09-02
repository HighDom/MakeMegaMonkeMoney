import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import CashBalanceButton from "./CashBalanceButton";
import CashBalance from "./CashBalance";
import { useWeb3Auth } from "@/context/web3AuthContext";
import LoggedInView from "../Web3View/LoggedInView";
import UnloggedInView from "../Web3View/UnloggedInView";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const { loggedIn } = useWeb3Auth();
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center  gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/** Logged In??? */}

            <CashBalance balance={49.99} />

            {/* <!-- Cash Balance Button --> */}
            <CashBalanceButton />
            {/* <!-- Cash Balance Button --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}
          </ul>

          {/* <!-- User Area --> */}

          <div className="grid">
            {loggedIn ? <DropdownUser /> : <UnloggedInView />}
          </div>
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
