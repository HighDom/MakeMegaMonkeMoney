import Link from "next/link";

const CashBalanceButton = () => {
  return (
    <Link
      href="/deposit"
      className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-2 py-1.5 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-5"
    >
      Deposit
    </Link>
  );
};

export default CashBalanceButton;
