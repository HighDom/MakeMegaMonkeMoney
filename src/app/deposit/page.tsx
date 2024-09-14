import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DepositMoney from "@/components/DepositMoney/DepositMoney";
import WithdrawMoney from "@/components/DepositMoney/WithdrawMoney";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const deposit = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270 space-y-10">
        <Breadcrumb pageName="Deposit" />
        <DepositMoney />
        <WithdrawMoney />
      </div>
    </DefaultLayout>
  );
};

export default deposit;
