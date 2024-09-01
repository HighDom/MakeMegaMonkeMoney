import Link from "next/link";

const CashBalanceButton = () => {
  return (
    <Link
      href="#"
      className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
    >
      <span>
        <img src="images/icon/bet.png" width={40} height={40} />
      </span>
      Button With Icon
    </Link>
  );
};

export default CashBalanceButton;
