import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DepositMoney from "@/components/DepositMoney/DepositMoney";
import Introduction from "@/components/Introduction/Introduction";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const deposit = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Introduction />
      </div>
    </DefaultLayout>
  );
};

export default deposit;
