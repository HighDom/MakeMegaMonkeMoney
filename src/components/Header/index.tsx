import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import CashBalanceButton from "./CashBalanceButton";
import CashBalance from "./CashBalance";
import { useWeb3Auth } from "@/context/useWeb3Auth";
import LoggedInView from "../Web3View/LoggedInView";
import UnloggedInView from "../Web3View/UnloggedInView";
import { useEffect } from "react";
import GameHashDisplay from "./GameHashDisplay";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const {
    loggedIn,
    userName,
    userAccount,
    userProfile,
    userBalance,
    logout,
    getAccounts,
    getUserInfo,
  } = useWeb3Auth();

  const fetchUserInformation = async () => {
    if (!loggedIn) {
      console.log("User is not logged in. Cannot fetch user information.");
      return;
    }
    await getUserInfo();
    await getAccounts();
    console.log("Header userName: ", userName);
    console.log("Header userAccount: ", userAccount);
  };

  useEffect(() => {
    fetchUserInformation();
  }, []);

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center  gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {loggedIn ? <GameHashDisplay /> : null}
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* Logged In??? */}

            {loggedIn ? <CashBalance userBalance={userBalance} /> : null}

            {false ? <CashBalanceButton /> : null}

            {/* Logged In??? */}

            {/* <!-- Notification Menu Area --> */}
            {loggedIn ? <DropdownNotification /> : null}
            {/* <!-- Notification Menu Area --> */}
          </ul>

          {/* <!-- User Area --> */}

          <div className="grid">
            {loggedIn ? (
              <DropdownUser
                userName={userName}
                userAccount={userAccount}
                userProfile={userProfile}
                logout={logout}
              />
            ) : (
              <UnloggedInView />
            )}
          </div>
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
