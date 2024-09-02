import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DepositMoney from "@/components/DepositMoney/DepositMoney";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const deposit = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Deposit" />
        <DepositMoney />
      </div>
    </DefaultLayout>
  );
};

export default deposit;
